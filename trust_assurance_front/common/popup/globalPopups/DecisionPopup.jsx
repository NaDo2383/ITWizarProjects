import React from 'react'
import MainPopup from '../_partials/MainPopup'
import { usePopupCtx } from '../usePopupCtx'
import GlobalMainPopup from '../_partials/GlobalMainPopup'
import { Flex } from '@/components/ui/containers/flex/Flex'
import Button from '@/components/ui/button/Button'
import { OutlineBtn } from '@/components/ui/button/OutlineBtn'
import { useGlobalPopupCtx } from '../useGlobalPopupCtx'
import styled from 'styled-components'

function DecisionPopup() {
    const { hideAllGlobalPopups, store } = useGlobalPopupCtx()
    const title = store?.popupProps[0]?.popupProps?.title

    async function handleOk() {
        await store?.popupProps[0]?.popupProps?.ok()
        hideAllGlobalPopups()
    }
    return (
        <GlobalMainPopup title={title}>
            <div className="d-flex flex-column gap-3 justify-evenly">
                <Flex column width="100%" align="center">
                    <Message>{store?.popupProps[0]?.popupProps?.message}</Message>
                    <Flex gap={20} width="100%">
                        <OutlineBtn width="100%" onClick={hideAllGlobalPopups}>취소</OutlineBtn>
                        <Button onClick={handleOk}>예</Button>
                    </Flex>
                </Flex>
            </div>
        </GlobalMainPopup>
    )
}

const Message = styled.p`
    margin-bottom: 10px;
`
export default DecisionPopup
