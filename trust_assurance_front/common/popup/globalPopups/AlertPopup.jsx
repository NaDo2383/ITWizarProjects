import React from 'react'
import MainPopup from '../_partials/MainPopup'
import GlobalMainPopup from '../_partials/GlobalMainPopup'
import { useGlobalPopupCtx } from '../useGlobalPopupCtx'
import Button from '@/components/ui/button/Button'
import { Flex } from '@/components/ui/containers/flex/Flex'
function AlertPopup() {
    const { hideGlobalPopup ,store } = useGlobalPopupCtx()
    const title = store.popupProps[0].popupProps.title
    const message = store.popupProps[0].popupProps.message
    const button = store.popupProps[0].popupProps.button

    async function handleOkBtn() {
        await store?.popupProps[0]?.popupProps?.ok()
        hideGlobalPopup()
    }
    return (
        <GlobalMainPopup title={title || null }>
            <Flex gap={30} column justify="center" width="100%">
                <p>{message}</p>
                <Flex width="100%" justify="end">
                {
                    button &&   <Button 
                                    onClick={handleOkBtn}
                                    width={button?.width}
                                >
                                    { button?.text || 'ok' }
                                </Button>
                }
                </Flex>
            </Flex>
        </GlobalMainPopup>
    )
}
export default AlertPopup
