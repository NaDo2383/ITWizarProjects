import InputText from "@/components/ui/form/elements/input/InputText";
import TextArea from "@/components/ui/form/elements/textArea/TextArea";
import useForm from "@/components/ui/form/store/useForm";
import React from "react";
import styled from "styled-components";
import { POPUP_TYPES } from "@/common/popup/popupRegistration";
import { usePopupCtx } from "@/common/popup/usePopupCtx";
import InputFileUi from "@/components/ui/form/elements/input/file/choices/InputFileUi";
import { BsPlusCircle } from "react-icons/bs";
import { Flex } from "@/components/ui/containers/flex/Flex";
import { BiMinusCircle } from "react-icons/bi";
import GhostBtn from "@/components/ui/button/GhostBtn";
import useArtwork from "../useArtwork";
import ImageViewer from "@/components/ui/form/elements/input/file/ImageViewer";
import { useState } from "react";
import { validateForm } from "@/common/validation/validate";
import { artworkFormSchema } from "./artworkFormSchema";
import { useGlobalPopupCtx } from "@/common/popup/useGlobalPopupCtx";
import { GLOBAL_POPUP_TYPES } from "@/common/popup/globalPopupRegistration";
import { mintMedia } from "@/libs/contract/consignFunctions";
import Select from "@/components/ui/form/elements/select/_choices/simpleSelect/Select";
import { languages } from "@/libs/constants";
import { useCrud } from "@/common/axios/useCrud";
import { useEffect } from "react";
import VideoViewer from "@/components/ui/form/elements/input/file/VideoViewer";
import AudioViewer from "@/components/ui/form/elements/input/file/choices/AudioViewer";
import useArtworks from "../useArtworks";
import useJwtAuth from "@/features/user/auth/useJwtAuth";
import { useGlobalCtx } from "@/common/global/useGlobalCtx";

const initialCreateArtworkState = {
    file: { value: null, error: null },
    mediaLink: { value: null, error: null },
    mediaName: { value: null, error: null },
    description: { value: null, error: null },
    language: { value: "ko", error: null },
    creatorList: [
        {
            creatorName: { value: null, error: null },
            creatorId: { value: null, error: null },
        },
    ],
};

function ArtworkCreateForm() {
    const { showGlobalPopup } = useGlobalPopupCtx();
    const { showPopup, setPopupState, popupState } = usePopupCtx();
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const [loading, setLoading] = useState(false);
    const { getMediaRegistrationStatus } = useArtworks()
    const { checkId } = useJwtAuth()
    const { setLoadingText, setLoadingWithContract } = useGlobalCtx()

    const {
        onChange,
        onChangeFile,
        onError,
        formState,
        setValueField,
        onChangeGroupList,
        setErrorField,
    } = useForm(initialCreateArtworkState);

    const {
        addCreatorField,
        removeCreatorField,
        onChangeCreatorField,
        uploadMediaFile,
        isUploading
    } = useArtwork(formState, onChangeGroupList);

    async function isImageUrl(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.startsWith('image/')) {
                return {
                    isImageUrl: true,
                    ImageUrl: url
                }
            } else {
                return {
                    isImageUrl: false,
                    ImageUrl: url
                }
            }
        } catch (error) {
            return {
                isImageUrl: false,
                ImageUrl: url
            }
        }
    }

    function handleOnchangeUrl(e) {
        onChange(e);
        isImageUrl(e.target.value).then((res) => {
            console.log(res);
            if (res.isImageUrl === true) {
                setImageUrl(res.ImageUrl?.includes("ipfs://") ? res.ImageUrl?.replace("ipfs://", "https://ipfs.io/ipfs/") : res.ImageUrl);
                setValueField("file", res.ImageUrl?.includes("ipfs://") ? res.ImageUrl?.replace("ipfs://", "https://ipfs.io/ipfs/") : res.ImageUrl);
            } else {
                setImageUrl(res.ImageUrl?.includes("ipfs://") ? res.ImageUrl?.replace("ipfs://", "https://ipfs.io/ipfs/") : res.ImageUrl);
                setValueField("file", null);
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, { message: `유효하지 않은 URL입니다.` })
            }
        }).catch(() => {
            setImageUrl(res.ImageUrl?.includes("ipfs://") ? res.ImageUrl?.replace("ipfs://", "https://ipfs.io/ipfs/") : res.ImageUrl);
            setValueField("file", null);
            showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, { message: `유효하지 않은 URL입니다.` })
        })
    }

    function handleFileInput(e) {
        const { files } = e.target;
        setImageUrl(files[0]?.name);
        onChangeFile(e);
    }

    async function generateSHA256Hash(file) {
        const buffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const sha256Hash = hashArray
            .map((byte) => byte.toString(16).padStart(2, "0"))
            .join("");

        return sha256Hash;
    }

    async function checkUserIds(createrID) {
        try {
            let result = true;
            await Promise.all(createrID.map(async (id) => {
                if (!id) return;
                const res = await checkId(id);

                if (!res.data.isId) {
                    showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                        message: '존재하지 않는 창작자 ID입니다. 창작자 ID를 확인해주세요'
                    });
                    result = false;
                } else {
                    result = true;
                }
            }));

            return result;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        setLoadingWithContract(true)
        if (!formState?.file?.value) {
            setErrorField("file", "please insert media file");
            return;
        }

        const { success, errors } = await validateForm(
            artworkFormSchema,
            formState
        );
        if (!success) {
            onError(errors);
            setLoadingWithContract(false)
            setLoading(false)
            return;
        }

        //creatorList validation
        if (
            !formState?.creatorList[0]?.creatorName?.value ||
            !formState?.creatorList[0]?.creatorId?.value
        ) {
            console.log("creatorList invalid");
            showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                message: "창작자 이름 또는 아이디를 정확하게 입력해주세요.",
            });
            setLoadingWithContract(false)
            setLoading(false)
            return;
        }


        const payload = {
            mediaFile: typeof formState?.file?.value === "object" ? formState?.file?.value : imageFile,
            name: formState?.mediaName?.value,
            description: formState?.description?.value,
        };
        const fileUploadRes = await uploadMediaFile(payload);

        console.log(fileUploadRes);

        if (fileUploadRes?.message === "successfully uploaded file") {
            setLoadingText("트랜잭션 컨펌 중")
            const createrName = [];
            const createrID = [];
            if (formState?.creatorList?.length > 1) {
                for (let i = 0; i < formState?.creatorList?.length; i++) {
                    createrName.push(
                        formState?.creatorList[i]?.creatorName?.value
                    );
                    createrID.push(formState?.creatorList[i]?.creatorId?.value);
                }
            } else {
                createrName.push(formState?.creatorList[0]?.creatorName?.value);
                createrID.push(formState?.creatorList[0]?.creatorId?.value);
            }

            const allIdsAreReal = await checkUserIds(createrID)
            if (!allIdsAreReal) {
                setLoadingWithContract(false)
                setLoading(false)
                setLoadingText("트랜잭션 컨펌 중")
                return
            }


            const sha256Hash = await generateSHA256Hash(typeof formState?.file?.value === "object" ? formState?.file?.value : imageFile);

            const metaData = {
                image: fileUploadRes?.ipfs?.image,
                media: [
                    formState?.mediaName?.value,
                    formState?.description?.value,
                    fileUploadRes?.ipfs?.image,
                    sha256Hash,
                    formState?.language?.value,
                ],
                createrName: createrName,
                createrID: createrID,
            };

            mintMedia(metaData, res => {
                if (res.code === "succcessful") {
                    console.log(res);
                    setPopupState(prev => ({ ...prev, newId: +res.newId, consignedNFTAdress: res?.receipt?.events?.consignNFT?.address }))
                    setTimeout(() => { getMediaRegistrationStatus(popupState?.getMediaRegistrationStatusPayload) }, 1000)
                    showPopup(POPUP_TYPES.LICENSE_MINT)
                    setLoadingWithContract(false)
                    setLoadingText("트랜잭션 컨펌 중")
                } else {
                    setLoadingWithContract(false)
                }
            }, setLoading)
            return;
        } else {
            showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                message: "업로드에 실패하였습니다. 다시 시도해주세요",
            });
            setLoadingWithContract(false)
            setLoading(false)
            setLoadingText("트랜잭션 컨펌 중")
        }

        // /trust_assuarnce_ipfs:91/ipsfs
        // 
    }

    const toDataURL = url => fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
        }))
        .catch((err) => { console.log(err); alert("Wrong media link") })

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    useEffect(() => {
        if (typeof formState?.file?.value === "string") {

            toDataURL(formState?.file?.value?.includes("ipfs://") ? formState?.file?.value?.replace("ipfs://", "https://ipfs.io/ipfs/") : formState?.file?.value)
                .then(dataUrl => {
                    if (dataUrl) {
                        var fileData = dataURLtoFile(dataUrl, "imageName.jpg");
                        setImageFile(fileData)
                    }
                })
        }
    }, [formState?.file?.value])

    return (
        <BigContainer>
            <Container>
                <FileUploadSec>
                    {
                        <FileUpload inValid={Boolean(formState?.file?.error)}>
                            <Label className="uploadfile" htmlFor="ImageInput">
                                {formState?.file?.value && ((formState?.file?.value?.type === "video/mp4" || formState?.file?.value?.type === "video/ogg") ?
                                    (typeof formState?.file?.value === "object" ?
                                        (
                                            <VideoViewer width={369} height={369} file={formState?.file?.value} style={{
                                                position: "absolute",
                                                zIndex: 101,
                                                borderRadius: "20px",
                                                overflow: "hidden",
                                            }} />
                                        ) : (
                                            <ImageWrapper>
                                                <video width={369} height={369} controls>
                                                    <source src={formState?.file?.value} />
                                                </video>
                                            </ImageWrapper>
                                        )
                                    )
                                    : (formState?.file?.value?.type?.includes("audio") ?
                                        (
                                            typeof formState?.file?.value === "object" ?
                                                (
                                                    <AudioViewer width={369} height={369} file={formState?.file?.value} style={{
                                                        position: "absolute",
                                                        zIndex: 101,
                                                        borderRadius: "20px",
                                                        overflow: "hidden",
                                                    }} />
                                                ) : (
                                                    <ImageWrapper>
                                                        <audio width={369} height={369} controls>
                                                            <source src={formState?.file?.value} />
                                                        </audio>
                                                    </ImageWrapper>
                                                )
                                        )
                                        :
                                        (typeof formState?.file?.value === "object" ?
                                            (
                                                <ImageViewer
                                                    alt="artowrkImage"
                                                    file={formState?.file?.value}
                                                    width={369}
                                                    height={369}
                                                    style={{
                                                        position: "absolute",
                                                        zIndex: 101,
                                                        borderRadius: "20px",
                                                        overflow: "hidden",
                                                    }}
                                                />
                                            ) : (
                                                <ImageWrapper>
                                                    <img
                                                        alt="artowrkImage"
                                                        src={formState?.file?.value}
                                                        width={369}
                                                        height={369}
                                                    />
                                                </ImageWrapper>
                                            )
                                        )))
                                }
                                <div className="text filename">
                                    JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV.Max
                                    1Gb.
                                </div>
                                <InputFileUi
                                    name="file"
                                    onChange={handleFileInput}
                                    id="ImageInput"
                                />
                            </Label>
                        </FileUpload>
                    }
                    또는
                    <InputText
                        onChange={(e) => handleOnchangeUrl(e)}
                        name={"mediaLink"}
                        value={imageUrl}
                        placeholder={"외부 링크 미디어 입력"}
                    />
                </FileUploadSec>
                <InputSection>
                    <Flex gap={20}>
                        <InputText
                            onChange={onChange}
                            name={"mediaName"}
                            value={formState?.mediaName?.value}
                            isValid={Boolean(formState?.mediaName?.error)}
                            placeholder={"미디어 이름"}
                        />
                        <Select
                            name="language"
                            options={languages}
                            defaultValue={languages[0].label}
                            onChange={onChange}
                        />
                    </Flex>
                    <TextArea
                        name={"description"}
                        onChange={onChange}
                        value={formState?.description?.value}
                        isValid={Boolean(formState?.description?.error)}
                        placeholder={"미디어에 대한 설명을 입력해주세요."}
                    />
                    <>
                        {formState?.creatorList?.length > 0 &&
                            formState?.creatorList?.map((creator, idx) => (
                                <Flex
                                    key={"creator-field" + idx}
                                    gap={10}
                                    align="center"
                                >
                                    {idx === 0 ? (
                                        <GhostBtn>
                                            <BsPlusCircle
                                                fontSize={80}
                                                color="#fff"
                                                onClick={addCreatorField}
                                            />
                                        </GhostBtn>
                                    ) : (
                                        <GhostBtn>
                                            <BiMinusCircle
                                                fontSize={80}
                                                color="#fff"
                                                onClick={() =>
                                                    removeCreatorField(idx)
                                                }
                                            />
                                        </GhostBtn>
                                    )}
                                    <InputText
                                        name="creatorName"
                                        value={
                                            formState?.creatorList[idx]
                                                ?.creatorName?.value
                                        }
                                        placeholder="창작자 이름"
                                        onChange={(e) =>
                                            onChangeCreatorField(e, idx)
                                        }
                                    />
                                    <InputText
                                        name="creatorId"
                                        value={
                                            formState?.creatorList[idx]
                                                ?.creatorId?.value
                                        }
                                        placeholder="창작자 ID"
                                        onChange={(e) =>
                                            onChangeCreatorField(e, idx)
                                        }
                                    />
                                </Flex>
                            ))}
                    </>
                </InputSection>
            </Container>
            {
                isUploading ?
                    <button>업로드 중 ...</button> :
                    loading ?
                        <button>로드 중 ...</button> : <button onClick={(e) => handleSubmit(e)}>발행</button>
            }
        </BigContainer>
    );
}

const FileUploadSec = styled.div`
    width: calc(max(50%, 400px));
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
`;

const FileUpload = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    aspect-ratio: 1 / 1;
    background-color: rgb(35, 35, 35);
    border-radius: 20px;
    text-align: center;
    flex-direction: column;
    border: ${(props) => (props.inValid ? "1px solid red" : "none")};
`;

const Label = styled.label`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
`;
const InputSection = styled.div`
    width: calc(max(50%, 400px));
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
`;

const Container = styled.div`
    display: flex;
    gap: 30px;
`;

const BigContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    min-width: 600px;
`;

const ImageWrapper = styled.div`
    position: absolute;
    z-index: 101;
`;

export default ArtworkCreateForm;
