/**
 * @createdBy duka
 */
import React, { useEffect, useState } from "react";
import Image from 'next/image'
import { PlayCircle, VolumeUp } from "@mui/icons-material";
import defpro from "public/def_pro.png";
import closeIco from 'public/close.png'
import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from "Components/ui/popup/usePopup";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import PopupActionButtons from "Components/ui/popup/popupMaterials/PopupActionButtons";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import { useGlobalModalContext } from "Components/ui/popup/useModalcontext";
import SwitchButton from "Components/ui/button/switchBtn";
import useArtworkTranslation from "locale/useArtworkTranslation";
import { useGlobalContext } from "common/global/useGlobalContext";
import { useRouter } from "next/router";

const RegisterLicensePopup = () => {
    const {
        detailTitle1_I18,
        detailTitle2_I18,
        cancel,
        saveI18,
        allRightsI18
    } = useArtworkTranslation()
    const router = useRouter()
    const { hideModal } = useGlobalModalContext();
    const { setGlobalLoading } = useGlobalContext()
    const [rightsLists, setRightsLists] = useState(null);
    const [data, setData] = useState(null)
    const { getCurrentModalprops, popupProps, globalModalState } = usePopup()


    async function handleConfirm() {
        setGlobalLoading(true)
        try {
            const generatedData = { "rights": data }
            await popupProps?.save(generatedData, popupProps?.artwork?.id)
            await globalModalState?.updateArtDetail()
            setTimeout(() => {
                hideModal()
            }, [1500])
        } catch (e) {
            console.error(e)
        } finally {
            setGlobalLoading(false)
        }
    }

    function handleSwitch(idx) {
        setRightsLists(prev => {
            const chosenRight = prev[idx]
            const updatedRight = { ...chosenRight, isChecked: !chosenRight.isChecked }
            const updatedRights = [...prev]
            updatedRights[idx] = updatedRight
            return updatedRights
        })
    }
    useEffect(() => {
        const chosenRights = rightsLists?.filter(right => right.isChecked === true)
        const chosenRightsData = chosenRights?.map(right => {
            const obj = {
                id: right.id,
                code: right.code
            }
            return obj
        })
        setData(chosenRightsData)
    }, [rightsLists])

    useEffect(() => {
        getCurrentModalprops()
        if (popupProps) {
            const generatedArtworkRights = popupProps?.artwork.rights.map(right => {
                const obj = {
                    id: right.id,
                    code: right.code,
                    isChecked: true,
                }
                return obj
            })
            const defaultRights = popupProps?.artworkRights?.map(right => {
                const obj = {
                    ...right,
                    isChecked: false
                }
                return obj
            })
            const initialRights = generatedArtworkRights.concat(defaultRights.filter(item2 => !generatedArtworkRights.some(item1 => item1.id === item2.id)))
            setRightsLists(initialRights)
        }
    }, [popupProps])

    return (
        <MainPopup width={530}>
            <PopupContainer>
                <PopupContent>
                    <div className="mb-[30px]">
                        <div className="flex flex-row justify-between">
                            <h3 className="text-[#fff] font-[500] text-[22px]">
                                라이선스 신청
                            </h3>
                            <button onClick={() => hideModal()} className="w-[29px] h-[29px]">
                                <Image src={closeIco} alt="closeIco" />
                            </button>
                        </div>
                        <p className="text-[#B0B0B0] font-[500] text-[16px] mt-[8px]">
                            {detailTitle1_I18}
                            {detailTitle2_I18}
                        </p>
                        <div className="flex flex-row mt-[30px] mb-[32px] bg-black p-[12px] gap-[10px]">
                            <div className="flex relative w-1/4 min-w-[102px] min-h-[102px] overflow-hidden rounded-[5px]">
                                {popupProps?.artwork?.fileType !== "IMAGE" ? (
                                    popupProps?.artwork?.fileType === "VIDEO" ? (
                                        <div className="relative h-full w-full flex justify-center">
                                            <video
                                                className={`w-full h-full rounded-[5px] object-cover bg-[#181A1A]`}
                                                src={
                                                    popupProps?.artwork?.imageUrl
                                                }
                                                loop
                                                autoPlay
                                                muted
                                                playsInline
                                                alt={popupProps?.artwork?.imageUrl}>
                                                <source
                                                    src={
                                                        popupProps?.artwork?.imageUrl
                                                    }
                                                    type="video"
                                                />
                                            </video>
                                            <div className="absolute bottom-0 p-2 mr-20">
                                                <PlayCircle
                                                    style={{ width: "18px", height: "18px" }}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative h-full w-full flex justify-center">
                                            <img
                                                src={
                                                    popupProps?.artwork?.thumbnailUrl3x
                                                        ? popupProps?.artwork?.thumbnailUrl3x
                                                        : "/art1.jpg"
                                                }
                                                width="100%"
                                                height="100%"
                                                className="w-full h-full rounded-[5px] object-cover"
                                                alt="artwork-thumbnail"
                                            />
                                            <div className="absolute bottom-0 p-2 mr-20">
                                                <VolumeUp
                                                    style={{ width: "18px", height: "18px" }}
                                                />
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    <Image
                                        height={134}
                                        width={134}
                                        priority
                                        layout="fill"
                                        unoptimized
                                        src={
                                            popupProps?.artwork?.imageUrl
                                                ? popupProps?.artwork?.imageUrl
                                                : defart
                                        }
                                        objectFit="cover"
                                        alt="imageUrl"
                                    />
                                )}
                            </div>
                            <div className="flex-1 w-3/4">
                                <h3 className="text-[16px] h-[46px]">
                                    {popupProps?.artwork?.artworkName}
                                </h3>
                                <div className="flex items-center lg:mt-[18px] mt-[8px] border-t border-[#4E4E4E] pt-[10px] relative">
                                    <div className="relative w-[23px] h-[23px] rounded-full overflow-hidden bg-[#333] border-[#999] border">
                                        <Image
                                            priority
                                            unoptimized
                                            layout="fill"
                                            objectFit="cover"
                                            src={
                                                popupProps?.artwork?.ownerProfileImg
                                                    ? popupProps?.artwork?.ownerProfileImg
                                                    : defpro
                                            }
                                            alt="ownerProfileImg"
                                        />
                                    </div>
                                    <span className="font-normal ml-2 text-[#B1B1B1] lg:text-[14px] md:text-[14px] text-[10px]">
                                        {popupProps?.artwork?.authorName}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full mt-6">
                            {rightsLists?.map((right, idx) => (
                                <div className="w-full flex items-center justify-between py-[15px] gap-[10px] border-b-2 border-[#292929] " key={`ri-${idx}`}>
                                    <div className="">
                                        <SwitchButton change={() => handleSwitch(idx)} on={right.isChecked} />
                                    </div>
                                    <div className="w-[460px] text-[B0B0B0] text-[16px] font-medium">{allRightsI18[right.code]}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </PopupContent>
                <PopupActionButtons
                    yes={handleConfirm}
                    no={() => hideModal()}
                    btnTexts={{ no: cancel, yes: saveI18 }}
                />
            </PopupContainer>
        </MainPopup>
    )
}

export default RegisterLicensePopup;