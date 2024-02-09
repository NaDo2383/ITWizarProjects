import MainPopup from "@/common/popup/_partials/MainPopup";
import Form from "@/components/ui/form/Form";
import React from "react";
import styled from "styled-components";
import ArtworkCreateForm from "../form/ArtworkCreateForm";



export default function CreateNewNFTPopup() {

  return (
      <Form>
        <MainPopup title={"미디어 NFT 발행"}>
            <Container>
              <ArtworkCreateForm />
            </Container>
        </MainPopup>
      </Form>
    );
}

const Container = styled.div`
    width: 40vw;
`;
