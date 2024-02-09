import MainPopup from '@/common/popup/_partials/MainPopup'
import Accordion from '@/components/ui/accordion/Accordion'
import React from 'react'
import styled from 'styled-components'
import RegisterTicketSalesAccordion from '@/components/ui/accordion/examples/artworkAccordion/RegisterTicketSalesAccordion'


export default function RegisterTicketSalesPopup() {
  return (
    <MainPopup title={"이용권 판매 등록"}>
        <Container>
            <h3>미디어 이름: 미디어 7</h3>
            <RegisterTicketSalesAccordion />
        </Container>
    </MainPopup>
  )
}

const Container = styled.div`
    width: 30vw
`
