import MainPopup from '@/common/popup/_partials/MainPopup'
import React, { useState } from 'react'
import NFTContractAddressVerifyForm from '../form/NFTContractAddressVerifyForm'
import styled from 'styled-components'
import ConsignmentForm from '../form/ConsignmentForm'
import Form from '@/components/ui/form/Form'
import { useGlobalCtx } from '@/common/global/useGlobalCtx'

export default function ConsignmentPopup() {
  const { isTokenVerified, setIsTokenVerified } = useGlobalCtx();
  return (

    <MainPopup title={"미디어 NFT 위탁"}>
      <Container>
        <h4>유효한 NFT인지 검증합니다.</h4>
        <Form>
          <NFTContractAddressVerifyForm isTokenVerified={isTokenVerified} setIsTokenVerified={setIsTokenVerified} />
        </Form>
        <Form>
          <ConsignmentForm isTokenVerified={isTokenVerified} setIsTokenVerified={setIsTokenVerified} />
        </Form>
      </Container>
    </MainPopup>

  )
}

const Container = styled.div`
  margin-top: 20px;
  min-width: 40vw;
`