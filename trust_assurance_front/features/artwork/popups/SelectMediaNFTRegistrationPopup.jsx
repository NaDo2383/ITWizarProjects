import MainPopup from "@/common/popup/_partials/MainPopup";
import React from "react";
import styled from "styled-components";
import { POPUP_TYPES } from "@/common/popup/popupRegistration";
import { usePopupCtx } from "@/common/popup/usePopupCtx";
import Button from "@/components/ui/button/Button";

export default function SelectMediaNFTRegistrationPopup() {
    const { showPopup } = usePopupCtx()

    return (
        <MainPopup title="미디어 NFT 등록 방식 선택">
            <Container>
                <Column>
                    <Title>미디어를 NFT로 신규 발행하여 등록할 경우</Title>
                    <Button fontSize={30} onClick={() => showPopup(POPUP_TYPES.CREATE_NEW_NFT)}>
                        <h5>신규 발행</h5>
                    </Button>
                </Column>
                <Column>
                    <Title>미디어가 이미 NFT로 발행되어 있을 경우</Title>
                    <Button fontSize={30} onClick={() => showPopup(POPUP_TYPES.CONSIGNMENT)}>
                        <h5>NFT 위탁</h5>
                    </Button>
                </Column>
            </Container>
        </MainPopup>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    gap: 50px;
    margin-top: 30px;
    width: 40vw;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
`

const Title = styled.h5`
    word-break: break-word;
    wrap: break-word;
    max-width: 80%;
    text-align: left;
`