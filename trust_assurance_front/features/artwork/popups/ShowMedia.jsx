import MainPopup from "@/common/popup/_partials/MainPopup";
import { usePopupCtx } from "@/common/popup/usePopupCtx";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

export default function ShowMedia() {
    const { popupState } = usePopupCtx();

    return (
        <MainPopup>
            <Container>
                {
                    popupState?.consignMetadata?.image ?
                        <Image
                            src={popupState?.consignMetadata?.image?.includes("ipfs://") ?
                                popupState?.consignMetadata?.image?.replace("ipfs://", "https://ipfs.io/ipfs/")
                                :
                                popupState?.consignMetadata?.image}
                            fill
                            style={{
                                maxWidth: "70%",
                                maxHeight: "65%",
                                margin: "auto",
                                aspectRatio: "auto",
                            }}
                        /> : <div className="w-full h-full flex justify-center items-center">Image url is not inserted</div>
                }
            </Container>
        </MainPopup>
    );
}

const Container = styled.div`
    width: 80vw;
    height: 70vh;
`;
