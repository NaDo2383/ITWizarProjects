import MainPopup from "@/common/popup/_partials/MainPopup";
import { usePopupCtx } from "@/common/popup/usePopupCtx";
import Button from "@/components/ui/button/Button";
import React from "react";
import styled from "styled-components";
function TermsOfUsePopup() {
    const { hidePopup, popupState } = usePopupCtx();
    return (
        <MainPopup>
            <h5 className="mb-30 break-spaces w-40vw h-50vh overflow-scroll">{popupState.termsofuse}</h5>
            <Button onClick={() => hidePopup()}>닫기</Button>
        </MainPopup>
    );
}

export default TermsOfUsePopup;
