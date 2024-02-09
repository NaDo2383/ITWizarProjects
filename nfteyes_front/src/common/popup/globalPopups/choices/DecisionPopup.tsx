import React from 'react'
import { useGlobalPopupCtx } from '../useGlobalPopupCtx'
import Flex from 'components/ui/containers/flex/Flex'
import GlobalMainPopup from '../../_partials/GlobalMainPopup'

function DecisionPopup() {
    const { hideAllGlobalPopups, store } = useGlobalPopupCtx()
    console.log('store', store)

    async function handleOk() {
        await store.popupProps[0].popupProps.ok()
        hideAllGlobalPopups()
    }
    return (
        <GlobalMainPopup title="DecisionPopup">
            <Flex gap={10} className="justify-evenly">
                <p>{store.popupProps[0].popupProps.message}</p>
                <button onClick={handleOk}>Ok</button>
                <button onClick={hideAllGlobalPopups}>Cancel</button>
            </Flex>
        </GlobalMainPopup>
    )
}

export default DecisionPopup
