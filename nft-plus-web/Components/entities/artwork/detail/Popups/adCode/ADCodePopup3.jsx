import React from "react";
import MainPopup from "Components/ui/popup/MainPopup";
import useAlertTranslation from "locale/useAlertTranslation";
import usePopup from "Components/ui/popup/usePopup";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import CloseBtn from "Components/ui/button/CloseBtn";
import useArtworkTranslation from "locale/useArtworkTranslation";
import { useRouter } from "next/router";
import useCommonTranslation from "locale/useCommonTranslation";

const ADCodePopup3 = () => {
    const { hideModal } = usePopup();
    const { vmSuccessI18, ADcodeSuccessI18 } = useAlertTranslation()
    const { goMypage } = useArtworkTranslation();
    const { push } = useRouter()
    const { closeI18 } = useCommonTranslation()

    function closeModal() {
        hideModal();
    }

    return (
        <MainPopup width={580}>
            <PopupContainer>
                <div className="flex justify-between">
                    <PopupHeader text={ADcodeSuccessI18} />
                    <CloseBtn onClick={closeModal} />
                </div>
                <PopupContent>
                    <div className="full pt-[30px] pb-[50px] flex items-center">
                        <h4 className="font-[400] sm:text-[18px] text-[14px] text-[#DDD]">
                            {vmSuccessI18}
                        </h4>
                    </div>
                </PopupContent>
                <div className="w-full flex flex-row sm:justify-end md:justify-end justify-center font-[300] gap-[10px] right-[30px]">
                    <button
                        className="min-w-[74px] bg-[#404040] text-white py-[6px] text-center rounded-[5px] cursor-pointer"
                        onClick={() => hideModal()}
                        type='button'
                    >
                        <h4 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500] px-[20px]">{closeI18}</h4>
                    </button>
                    <button
                        className={`min-w-[74px] bg-[#FB3873] text-white py-[6px] focus:outline-none text-center rounded-[5px]`}
                        onClick={() => {
                            push(`/mypage?subpage=purchasedNft`);
                            hideModal()
                        }}
                    >
                        <h4 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500] px-[20px]">{goMypage}</h4>
                    </button>
                </div>
            </PopupContainer>
        </MainPopup>
    )
}

export default ADCodePopup3