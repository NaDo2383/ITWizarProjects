import React, { useEffect, useState } from "react";
import MainPopup from "Components/ui/popup/MainPopup";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import { PopContainer } from "Components/ui/popup/popupUi";
import usePopup from "Components/ui/popup/usePopup";
import useMypageTranslation from "locale/useMypageTranslation";
import useArtworkTranslation from "locale/useArtworkTranslation";
import { LicenseRow } from "./licensePopupUi/LicenseRow";
import H2 from "Components/ui/typography/H2";
import P from "Components/ui/typography/P";
import LicenseBigTitle from "./licensePopupUi/LicenseBigTitle";
import { useGlobalContext } from "common/global/useGlobalContext";
import { LicenseContainer, LicenseFirstCol, LicenseSecondCol } from "./licensePopupUi/LicenseCol";
import Image from "next/image";

function MobileLicenseRequestPopup1() {
    const [iconShow, setIconShow] = useState(false);
    const {
        cancel: cancelI18,
        requesterNameI18,
        mainTitleI18
    } = useArtworkTranslation();
    const {
        worknameI18,
        contractDetailsI18,
        nextI18,
        attribution_andI18,
        copyrightLicensorI18
    } = useMypageTranslation();
    const { authUser } = useGlobalContext()
    const {
        handleShowModal,
        MODAL_TYPES,
        hideModal,
        setGlobalModalState,
        globalModalState,
        popupProps,
        getCurrentModalprops
    } = usePopup();

    function handleNextRequest() {
        setGlobalModalState(prev => (
            {
                ...prev,
                artDetail: globalModalState?.artDetail,
                showSwitchNetworkModal: (modalType) => {
                    hideModal();
                    handleShowModal(modalType);
                }
            }
        ))
        handleShowModal(MODAL_TYPES.MOBILE_LICENSE_REQUEST2)
    }

    useEffect(() => {
        getCurrentModalprops()
    }, [popupProps])

    console.log("test", authUser,  globalModalState?.artDetail)

    return (
        <MainPopup width={360} height={600}>
            <PopContainer>
                <PopupHeader text={mainTitleI18} />
                <PopupContent>
                    <div className="w-full pt-[25px] pb-[60px]">
                        <LicenseContainer>
                            <LicenseFirstCol>
                                <div className="relative cursor-pointer flex justify-center items-center rounded-[5px]">
                                    {(!iconShow && globalModalState?.artDetail?.fileType === "AUDIO") ||
                                        (iconShow && globalModalState?.artDetail?.fileType === "AUDIO") ||
                                        (!iconShow &&
                                            globalModalState?.artDetail?.fileType === "VIDEO" &&
                                            globalModalState?.artDetail?.imageFile.url2) ||
                                        globalModalState?.artDetail?.fileType === "IMAGE" ? (
                                        <div className="relative w-[200px] h-[200px] bg-black">
                                            <div className='w-full h-full flex justify-center items-center'>
                                                <Image
                                                    style={{ borderRadius: '5px' }}
                                                    src={
                                                        globalModalState?.artDetail?.thumbnailUrl3x
                                                            ? globalModalState?.artDetail?.thumbnailUrl3x
                                                            : "/art1.jpg"
                                                    }
                                                    priority
                                                    unoptimized
                                                    layout="fill"
                                                    objectFit="cover"
                                                    alt={'thumbnailUrl3x'}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    {globalModalState?.artDetail?.fileType === "VIDEO" ? (
                                        <div className="relative ">
                                            <div
                                                className={
                                                    iconShow || !globalModalState?.artDetail?.imageFile.url2
                                                        ? " h-full cursor-pointer w-full overflow-hidden bg-cover bg-center flex justify-center items-center"
                                                        : "none w-0 h-0 "
                                                }>
                                                <video
                                                    className={`w-[200px] h-[200px] rounded-[5px] object-cover bg-[#181A1A]`}
                                                    src={
                                                        globalModalState?.artDetail?.imageUrl}
                                                    loop
                                                    autoPlay
                                                    muted
                                                    playsInline
                                                    alt={globalModalState?.artDetail?.imageUrl}>
                                                    <source
                                                        src={
                                                            globalModalState?.artDetail?.imageUrl}
                                                        type="video"
                                                    />
                                                </video>
                                            </div>
                                        </div>
                                    ) : (
                                        globalModalState?.artDetail?.fileType === "AUDIO" &&
                                        iconShow && (
                                            <div className="relative w-[200px] h-[200px]">
                                                 <div className="absolute AUDIO bottom-0 left-1/2 -translate-x-1/2 w-full p-2">
                                                    <AudioStream
                                                        src={globalModalState?.artDetail?.imageUrl}
                                                        setIconShow={setIconShow}
                                                        iconShow={iconShow}
                                                        loop
                                                        playsInline
                                                        autoPlay
                                                    />
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </LicenseFirstCol>
                            <LicenseSecondCol>
                                <LicenseBigTitle text={contractDetailsI18} />
                                <LicenseRow>
                                    <div className="w-1/5 min-w-[150px]">
                                        <H2>{worknameI18}</H2>
                                    </div>
                                    <div className="w-4/5">
                                        <p className="text-[15px] text-[#fff] font-[400]">{globalModalState?.artDetail?.artworkName}</p>
                                    </div>
                                </LicenseRow>
                                <LicenseRow>
                                    <div className="w-1/5 min-w-[150px]">
                                        <H2>
                                            {attribution_andI18}<br />
                                            {copyrightLicensorI18}
                                        </H2>
                                    </div>
                                    <div className="w-4/5">
                                        <P>{authUser?.nickName}</P>
                                    </div>
                                </LicenseRow>
                                <LicenseRow>
                                    <div className="w-1/5 min-w-[150px]">
                                        <H2>{requesterNameI18}</H2>
                                    </div>
                                    <div className="w-4/5">
                                        <P>{globalModalState?.artDetail?.authorName}</P>
                                    </div>
                                </LicenseRow>
                            </LicenseSecondCol>
                        </LicenseContainer>
                    </div>
                </PopupContent>
                <div className="w-full flex flex-row sm:justify-end md:justify-end justify-center font-[300] gap-[10px] right-[30px]">
                    <button
                        className="min-w-[74px] bg-[#333] text-white py-[6px] text-center rounded-[5px] cursor-pointer"
                        onClick={() => hideModal()}
                    >
                        <h4 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500] px-[20px]">{cancelI18}</h4>
                    </button>
                    <button
                        className={`min-w-[74px] bg-[#6319FF]  text-white py-[6px] focus:outline-none text-center rounded-[5px]`}
                        onClick={handleNextRequest}
                        type='submit'
                    >
                        <h4 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500] px-[20px]">{nextI18}</h4>
                    </button>
                </div>
            </PopContainer>
        </MainPopup >
    );
}

export default MobileLicenseRequestPopup1;
