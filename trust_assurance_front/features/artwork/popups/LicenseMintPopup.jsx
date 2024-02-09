import MainPopup from "@/common/popup/_partials/MainPopup";
import React from "react";
import styled from "styled-components";
import LicenseMintForm from "../form/LicenseMintForm";
import Form from "@/components/ui/form/Form";

export default function LicenseMintPopup() {
    return (
        <Form>
            <MainPopup title={"저작권 토큰 발행"}>
                <Container>
                    <LicenseMintForm />
                </Container>
            </MainPopup>
        </Form>
    );
}

const Container = styled.div`
    width: 35vw;
`;

