import React from "react";
import MainPopup from "Components/ui/popup/MainPopup";
import useAlertTranslation from "locale/useAlertTranslation";
import usePopup from "Components/ui/popup/usePopup";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import CloseBtn from "Components/ui/button/CloseBtn";
import useFAQpageTranslation from "locale/useFAQpageTranslation";

const ADCodePopup1 = () => {
    const { hideModal } = usePopup();
    const { vmErrorI18, ADcodeI18 } = useAlertTranslation()
    const {confirmI18} = useFAQpageTranslation()

    function closeModal() {
        hideModal();
    }

    return (
        <MainPopup width={530}>
            <PopupContainer>
                <div className="flex justify-between">
                    <PopupHeader text={ADcodeI18} />
                    <CloseBtn onClick={closeModal} />
                </div>
                <PopupContent>
                    <div className="full pt-[30px] pb-[40px] flex items-center">
                        <h5 className="font-[400] sm:text-[18px] text-[14px] text-[#DDD]">
                            {vmErrorI18}
                        </h5>
                    </div>
                </PopupContent>
                <div className="w-full flex flex-row sm:justify-end md:justify-end justify-center font-[300] gap-[10px] right-[30px]">
                    <button
                        className="min-w-[74px] bg-[#404040] text-white py-[6px] text-center rounded-[5px] cursor-pointer"
                        onClick={() => {
                            hideModal()
                        }}
                    >
                        <h5 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500] px-[20px]">{confirmI18}</h5>
                    </button>
                </div>
            </PopupContainer>
        </MainPopup>
    )
}

export default ADCodePopup1