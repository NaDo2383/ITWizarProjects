import { usePopupCtx } from "@/common/popup/usePopupCtx";
import React from "react";
import MainPopup from "@/common/popup/_partials/MainPopup";
import { OutlineBtn } from "@/components/ui/button/OutlineBtn";
import { Flex } from "@/components/ui/containers/flex/Flex";
import { cancelConsign } from "@/libs/contract/consignFunctions";
import { useGlobalCtx } from "@/common/global/useGlobalCtx";
import useArtworks from "../useArtworks";

function NFTConsignmentPopup() {
    const { hidePopup, popupState } = usePopupCtx();
    const { setLoadingWithContract } = useGlobalCtx()
    const { getMediaRegistrationStatus } = useArtworks();

    const handleClick = () => {
        setLoadingWithContract(true)
        cancelConsign(popupState?.consignCancelingTokenId, popupState?.consignedNFTAdress, (res) => {
            if (res.status === "successful") {
                setLoadingWithContract(false)
                setTimeout(() => { getMediaRegistrationStatus(popupState?.getMediaRegistrationStatusPayload) }, 500)
                setTimeout(() => { getMediaRegistrationStatus(popupState?.getMediaRegistrationStatusPayload) }, 5000)
                hidePopup()
            } else {
                alert("failed")
                setLoadingWithContract(false)
                hidePopup()
            }
        })
    }

    return (
        <MainPopup>
            <p align="center" className="pre-wrap">
                {"미디어 NFT 위탁을 취소하시겠습니까? \n확인시 취소 트랜잭션이 발생합니다."}
            </p>
            <Flex justify="space-evenly" py={12} width="100%">
                <OutlineBtn onClick={() => handleClick()}>확인</OutlineBtn>
                <OutlineBtn danger="true" onClick={() => hidePopup()}>닫기</OutlineBtn>
            </Flex>
        </MainPopup>
    );
}

export default NFTConsignmentPopup;
