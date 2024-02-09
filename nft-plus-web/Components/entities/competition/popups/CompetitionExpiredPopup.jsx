import React from "react";
import MainPopup from "Components/ui/popup/MainPopup";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import useAlertTranslation from "locale/useAlertTranslation";
import useCommonTranslation from "locale/useCommonTranslation";
import useFAQpageTranslation from "locale/useFAQpageTranslation";
import usePopup from "Components/ui/popup/usePopup";
import closeIco from 'public/close.png'
import Image from "next/image";

function CompetitionExpiredPopup() {
    const { hideModal } = usePopup();
    const { competitionIsExpiredI18 } = useAlertTranslation();
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
                        <Image src={closeIco} alt="closeIco" />
                    </button>
                </div>
                <PopupContent>
                    <h3 className="pt-[30px] pb-[40px] sm:text-[18px] text-[15px] text-[#DDD] font-[400]">{competitionIsExpiredI18}</h3>
                </PopupContent>
                <div className="w-full flex flex-row justify-end font-[300] gap-[10px] right-[30px]">
                    <button
                        className={`min-w-[74px] bg-[#FB3873]  text-white py-[6px] focus:outline-none text-center rounded-[5px]`}
                        onClick={() => hideModal()}
                        type='submit'
                    >
                        <h3 className="lg:text-[18px] sm:text-[16px] text-[14px] font-[500] px-[20px]">{confirmI18}</h3>
                    </button>
                </div>
            </PopupContainer>
        </MainPopup>
    );
}

export default CompetitionExpiredPopup;
