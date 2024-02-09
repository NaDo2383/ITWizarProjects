import React from 'react'
import GlobalMainPopup from '../../_partials/GlobalMainPopup'
import { useGlobalPopupCtx } from '../useGlobalPopupCtx'
import Button from 'components/ui/button/Button'
import { Flex } from 'components/ui/containers/flex/Flex'
function AlertPopup() {
    const { hideGlobalPopup, store } = useGlobalPopupCtx()
    const title = store.popupProps[0].popupProps.title
    const message = store.popupProps[0].popupProps.message
    const withButton = store.popupProps[0].popupProps.withButton
    return (
        <GlobalMainPopup title={title || null}>
            <Flex justify="center" width="100%">
                <p>{message}</p>
            </Flex>
            {withButton && <Button onClick={hideGlobalPopup}>Ok</Button>}
        </GlobalMainPopup>
    )
}
export default AlertPopup
