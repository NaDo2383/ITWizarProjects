import Accordion from '@/components/ui/accordion/Accordion'
import React from 'react'
import RegisterTicketSalesAccordionTab from './RegisterTicketSalesAccordionTab'
import styled from 'styled-components'
import { usePopupCtx } from '@/common/popup/usePopupCtx'

export default function RegisterTicketSalesAccordion() {
  const { popupState } = usePopupCtx();

  return (
    <Accordion>
        <div>
            <Title>저작권 유형</Title>
            {popupState?.type && popupState?.type?.map((right, index)=>(
              <RegisterTicketSalesAccordionTab 
                key={index+"mtrowb"} 
                title={right} 
                id={index} 
                licenseDetail={popupState?.licenseDetail}
                copyrighttoken={popupState?.copyrighttoken[index]}
                mediaNftId={popupState?.mediaNftId}
              />
            ))}
        </div>
        
    </Accordion>
  )
}

const Title = styled.h4`
    padding: 15px;
    border-bottom  : 1px solid "white";
    color : "#C8E022";
`
