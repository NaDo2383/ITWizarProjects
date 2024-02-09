import React from "react";
import MainPopup from "Components/ui/popup/MainPopup";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import useFAQpageTranslation from "locale/useFAQpageTranslation";
import useCommonTranslation from "locale/useCommonTranslation";
import { useRouter } from "next/router";
import usePopup from "Components/ui/popup/usePopup";

function CompetitionExceededPopup() {
    const { locale } = useRouter();
    const { store, hideModal } = usePopup();
    const krAlert = `본 공모전은 최대 ${store?.modalProps[0].modalProps}개 작품 까지 응모 가능합니다.`;
    const enAlert = `Up to ${store?.modalProps[0].modalProps} works can be submitted for this contest.`;
    const { confirmI18 } = useFAQpageTranslation();
    const { noticeI18 } = useCommonTranslation();

    return (
        <MainPopup>
            <PopupContainer>
                <PopupHeader text={noticeI18} />
                <PopupContent>
                    <h2 className="text-lg py-[86px] font-medium sm:px-[64.2px]">
                        {locale === "en" ? enAlert : krAlert}
                    </h2>
                </PopupContent>
            </PopupContainer>
            <button className="w-full py-2 text-white text-[20px] font-medium bg-pinky" onClick={() => hideModal()}>
                {confirmI18}
            </button>
        </MainPopup>
    );
}

export default CompetitionExceededPopup;
