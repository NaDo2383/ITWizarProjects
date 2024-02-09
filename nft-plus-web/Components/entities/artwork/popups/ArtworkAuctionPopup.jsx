import React from "react";
import MainPopup from "Components/ui/popup/MainPopup";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import useCommonTranslation from "locale/useCommonTranslation";
import useFAQpageTranslation from "locale/useFAQpageTranslation";
import usePopup from "Components/ui/popup/usePopup";
import closeIco from 'public/close.png'
import Image from "next/image";
import useArtworkTranslation from "locale/useArtworkTranslation";

function ArtworkAuctionPopup() {
    const { auctionDisabledI18, auctionDisabled2I18 } = useArtworkTranslation()
    const { hideModal } = usePopup();
    const { noticeI18 } = useCommonTranslation();
    const { confirmI18 } = useFAQpageTranslation();

    return (
        <MainPopup width={530}>
            <PopupContainer>
                <div className="flex flex-row justify-between">
                    <h3 className="text-[#fff] font-[500] text-[22px]">
                        {noticeI18}
                    </h3>
                    <button onClick={() => hideModal()} className="w-[29px] h-[29px]">
                        <Image src={closeIco} alt="closeIcon" />
                    </button>
                </div>
                <PopupContent>
                    <div className="pt-[30px] pb-[40px] text-[18px] text-[#DDD] font-[400]">
                        <p>{auctionDisabledI18}</p>
                        <p>{auctionDisabled2I18}</p>
                    </div>
                </PopupContent>
                <div className="w-full flex flex-row justify-end font-[300] gap-[10px] right-[30px]">
                    <button
                        className={`min-w-[74px] bg-[#FB3873]  text-white py-[6px] focus:outline-none text-center rounded-[5px]`}
                        onClick={() => hideModal()}
                        type='submit'
                    >
                        <h3 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500] px-[20px]">{confirmI18}</h3>
                    </button>
                </div>
            </PopupContainer>
        </MainPopup>
    );
}

export default ArtworkAuctionPopup;
