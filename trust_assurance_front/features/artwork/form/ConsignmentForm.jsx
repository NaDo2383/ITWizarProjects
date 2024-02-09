import { usePopupCtx } from "@/common/popup/usePopupCtx";
import Button from "@/components/ui/button/Button";
import { Flex } from "@/components/ui/containers/flex/Flex";
import TextArea from "@/components/ui/form/elements/textArea/TextArea";
import React, { useEffect, useState } from "react";
import { POPUP_TYPES } from "@/common/popup/popupRegistration";
import useForm from "@/components/ui/form/store/useForm";
import InputText from "@/components/ui/form/elements/input/InputText";
import GhostBtn from "@/components/ui/button/GhostBtn";
import { BsPlusCircle } from "react-icons/bs";
import { BiMinusCircle } from "react-icons/bi";
import useArtwork from "../useArtwork";
import { languages } from "@/libs/constants";
import { consignMedia } from "@/libs/contract/consignFunctions";
import Select from "@/components/ui/form/elements/select/_choices/simpleSelect/Select";
import styled from "styled-components";
import useArtworks from "../useArtworks";
import useJwtAuth from "@/features/user/auth/useJwtAuth";
import { GLOBAL_POPUP_TYPES } from "@/common/popup/globalPopupRegistration";
import { useGlobalPopupCtx } from "@/common/popup/useGlobalPopupCtx";
import { useGlobalCtx } from "@/common/global/useGlobalCtx";

const initialState = {
    mediaName: { value: null, error: null },
    mediaUrl: { value: null, error: null },
    description: { value: null, error: null },
    creatorList: [
        {
            creatorName: { value: null, error: null },
            creatorId: { value: null, error: null },
        },
    ],
    language: { value: 'ko', error: null }
};

export default function ConsignmentForm(props) {
    const { showPopup, popupState, setPopupState } = usePopupCtx();
    const { showGlobalPopup } = useGlobalPopupCtx();
    const { onChange, onError, formState, onChangeGroupList } =
        useForm(initialState);
    const { addCreatorField, removeCreatorField, onChangeCreatorField } =
        useArtwork(formState, onChangeGroupList);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const { getMediaRegistrationStatus } = useArtworks()
    const { checkId } = useJwtAuth()
    const { isTokenVerified } = props
    const { setLoadingWithContract } = useGlobalCtx()

    function showMedia() {
        if (!popupState?.consignMetadata?.image) {
            setPopupState(prev => ({ ...prev, consignMetadata: { ...prev.consignMedia, image: formState?.mediaUrl?.value } }))
        }
        showPopup(POPUP_TYPES.SHOW_MEDIA)
    }

    async function generateSHA256Hash(file) {
        if (!file) {
            alert("Please insert image url");
            return;
        }
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

    function onChangePopupState(name, e) {
        console.log("working");
        setPopupState(prev => ({ ...prev, consignMetadata: { ...prev.consignMetadata, [name]: e.target.value } }))
    }

    function onChangePopupStateForSelectLanguage(e) {
        onChangePopupState("language", e)
    }

    function onChangeCreatorFieldSub(e, idx) {
        const { value, name } = e.target;

        setPopupState(prev => {
            const creatorList = prev?.consignMetadata?.creatorList || [];
            const newCreatorList = creatorList.map((creator, id) => {
                if (id === idx) {
                    return { ...creator, [name]: value };
                } else {
                    return creator;
                }
            });



            // If idx is greater than the length of the array, add a new object
            if (idx >= creatorList.length) {
                newCreatorList.push({ [name]: value });
            }

            return {
                ...prev,
                consignMetadata: {
                    ...prev.consignMetadata,
                    creatorList: newCreatorList,
                },
            };
        });
    }

    async function handleSubmit() {
        setLoadingWithContract(true)
        setLoading(true)
        let createrName = [];
        let createrID = [];
        if (formState?.creatorList?.length > 0) {
            for (let i = 0; i < formState.creatorList.length; i++) {
                if ((formState.creatorList[i].creatorName.value && formState.creatorList[i].creatorId.value) || (popupState?.consignMetadata?.creatorList[i]?.creatorName && popupState?.consignMetadata?.creatorList[i]?.creatorId)) {
                    createrName.push(formState.creatorList[i].creatorName.value ? formState.creatorList[i].creatorName.value : popupState?.consignMetadata?.creatorList[i]?.creatorName);
                    createrID.push(formState.creatorList[i].creatorId.value ? formState.creatorList[i].creatorId.value : popupState?.consignMetadata?.creatorList[i]?.creatorId);
                } else {
                    showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                        message: '창작자 정보를 입력해주세요.'
                    });
                    setLoadingWithContract(false)
                    setLoading(false)
                    return
                }
            }
        } else {
            setLoadingWithContract(false)
            setLoading(false)
            return
        }

        const allIdsAreReal = await checkUserIds(createrID)
        if (!allIdsAreReal) {
            setLoadingWithContract(false)
            setLoading(false)
            return
        }

        const sha256Hash = await generateSHA256Hash(imageFile && imageFile);

        const metaData = {
            media: [
                popupState?.consignMetadata?.name ? popupState?.consignMetadata?.name : formState?.mediaName?.value,
                popupState?.consignMetadata?.description ? popupState?.consignMetadata?.description : formState?.description?.value,
                popupState?.consignMetadata?.image ? popupState?.consignMetadata?.image : formState?.mediaUrl?.value,
                sha256Hash,
                "",
            ],
            createrInfo: {
                createrName: createrName,
                createrID: createrID,
            },
        };

        consignMedia(popupState?.consigningMediaId, metaData,
            res => {
                console.log(res);
                if (res.status === "successful") {
                    console.log("res2:", res);
                    setPopupState(prev => ({ ...prev, consignedNFTAdress: res.consignedNFTAdress }))
                    setTimeout(() => { getMediaRegistrationStatus(popupState?.getMediaRegistrationStatusPayload) }, 500)
                    setTimeout(() => { getMediaRegistrationStatus(popupState?.getMediaRegistrationStatusPayload) }, 5000)
                    showPopup(POPUP_TYPES.LICENSE_MINT);
                    setLoadingWithContract(false)
                } else {
                    setLoadingWithContract(false)
                    return
                }
            }
            ,
            res => {
                if (res.status === "successful") {
                    console.log("res1:", res);
                    setPopupState(prev => ({ ...prev, newId: +res.newId }))
                } else {
                    setLoadingWithContract(false)
                    return
                }
            }
            , setLoading, setLoadingWithContract
        );
    }

    console.log("popupState: ", popupState);

    const toDataURL = url => fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
        }))

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    useEffect(() => {
        if (typeof formState?.mediaUrl?.value === "string" || typeof popupState?.consignMetadata?.image === "string") {
            toDataURL(popupState?.consignMetadata?.image ?
                (popupState?.consignMetadata?.image?.includes("ipfs://") ?
                    popupState?.consignMetadata?.image?.replace("ipfs://", "https://ipfs.io/ipfs/")
                    : popupState?.consignMetadata?.image)
                :
                (formState?.mediaUrl?.value?.includes("ipfs://") ?
                    formState?.mediaUrl?.value?.replace("ipfs://", "https://ipfs.io/ipfs/")
                    :
                    formState?.mediaUrl?.value))
                .then(dataUrl => {
                    var fileData = dataURLtoFile(dataUrl, "imageName.jpg");
                    setImageFile(fileData)
                })
        }
    }, [formState?.mediaUrl?.value, popupState?.consignMetadata?.image])

    const languageLabel = languages[languages.findIndex(e => e.value === popupState?.consignMetadata?.language)]?.value ? languages[languages.findIndex(e => e.value === popupState?.consignMetadata?.language)]?.value : languages[0].value


    return (
        <Container>
            <h5 className="mb-xl-4">미디어의 메타데이터 정보를 입력해주세요.</h5>
            {popupState?.consignMetadata?.name ?
                <InputText
                    name="mediaName"
                    onChange={(e) => onChangePopupState("name", e)}
                    value={popupState?.consignMetadata?.name}
                    placeholder={"미디어 이름"}
                />
                :
                <InputText
                    name="mediaName"
                    onChange={onChange}
                    value={formState?.mediaName?.value}
                    isValid={Boolean(formState?.mediaName?.error)}
                    placeholder={"미디어 이름"}
                    isDisabled={!isTokenVerified}
                />
            }
            <Flex gap={20} py={20}>
                {
                    popupState?.consignMetadata?.language ?
                        <Select
                            name="language"
                            options={languages}
                            defaultValue={languageLabel}
                            onChange={onChangePopupStateForSelectLanguage}
                        />
                        :
                        <Select
                            name="language"
                            options={languages}
                            defaultValue={formState?.language?.value ? languages[languages.findIndex(e => e.value === formState?.language?.value)].value : languages[0].value}
                            onChange={onChange}
                        />
                }
                {popupState?.consignMetadata?.image ?
                    <InputText
                        name="mediaUrl"
                        onChange={(e) => onChangePopupState("image", e)}
                        value={popupState?.consignMetadata?.image}
                        isValid={Boolean(formState?.mediaUrl?.error)}
                        placeholder={"미디어 URL"}
                    />
                    :
                    <InputText
                        name="mediaUrl"
                        onChange={onChange}
                        value={formState?.mediaUrl?.value}
                        isValid={Boolean(formState?.mediaUrl?.error)}
                        placeholder={"미디어 URL"}
                        isDisabled={!isTokenVerified}
                    />}
            </Flex>
            {popupState?.consignMetadata?.description ?
                <TextArea
                    name="description"
                    onChange={(e) => onChangePopupState("description", e)}
                    isValid={Boolean(formState?.description?.error)}
                    value={popupState?.consignMetadata?.description}
                />
                :
                <TextArea
                    name="description"
                    onChange={onChange}
                    isValid={Boolean(formState?.description?.error)}
                    value={formState?.description?.value}
                    disabled={!isTokenVerified}
                />
            }
            <Button className={"mt-10 mb-0"} onClick={() => showMedia()}>미디어 보기</Button>
            {formState?.creatorList?.length > 0 &&
                ((formState?.creatorList?.length >= popupState?.consignMetadata?.creatorList?.length || !popupState?.consignMetadata?.creatorList?.length) ? formState?.creatorList : popupState?.consignMetadata?.creatorList)?.map((creator, idx) => (
                    <Flex key={"creator-field" + idx} gap={10} align="center">
                        {idx === 0 ? (
                            <GhostBtn>
                                <BsPlusCircle
                                    fontSize={80}
                                    color="#fff"
                                    onClick={() => addCreatorField()}
                                />
                            </GhostBtn>
                        ) : (
                            <GhostBtn>
                                <BiMinusCircle
                                    fontSize={80}
                                    color="#fff"
                                    onClick={() => removeCreatorField(idx)}
                                />
                            </GhostBtn>
                        )}
                        <InputText
                            name="creatorName"
                            value={
                                popupState?.consignMetadata?.creatorList[idx]?.creatorName ?
                                    popupState?.consignMetadata?.creatorList[idx]?.creatorName
                                    :
                                    formState?.creatorList[idx]?.creatorName?.value
                            }
                            placeholder="창작자 이름"
                            onChange={(e) => { onChangeCreatorField(e, idx); onChangeCreatorFieldSub(e, idx) }}
                            isDisabled={!isTokenVerified}
                        />
                        <InputText
                            name="creatorId"
                            value={
                                popupState?.consignMetadata?.creatorList[idx]?.creatorId ?
                                    popupState?.consignMetadata?.creatorList[idx]?.creatorId
                                    :
                                    formState?.creatorList[idx]?.creatorId?.value
                            }
                            placeholder="창작자 ID"
                            onChange={(e) => { onChangeCreatorField(e, idx); onChangeCreatorFieldSub(e, idx) }}
                            isDisabled={!isTokenVerified}
                        />
                    </Flex>
                ))}
            {
                loading ?
                    <Button className={"mt-30 mb-0"}>
                        로드 중 ...
                    </Button> :
                    !isTokenVerified ?
                        <Button className={"mt-30 mb-0"} disabled={!isTokenVerified}>
                            위탁
                        </Button>
                        :
                        <Button className={"mt-30 mb-0"} onClick={handleSubmit}>
                            위탁
                        </Button>
            }
        </Container>
    );
}

const Container = styled.div`
    margin-top: 20px;
`;
