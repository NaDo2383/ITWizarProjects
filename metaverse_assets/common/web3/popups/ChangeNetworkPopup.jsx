import GlobalMainPopup from 'a/common/popup/_partials/GlobalMainPopup'
import { useGlobalPopupCtx } from 'a/common/popup/globalPopups/useGlobalPopupCtx'
import Button from 'a/components/ui/button/Button'
import { OutlineBtn } from 'a/components/ui/button/OutlineBtn'
import { Flex } from 'a/components/ui/containers/flex/Flex'
import React from 'react'
import useWeb3 from '../useWeb3'

function ChangeNetworkPopup() {
    const { hideGlobalPopup } = useGlobalPopupCtx()
    const { changeNetwork } = useWeb3()

    async function handleChangeNetwork() {
        await changeNetwork()
        hideGlobalPopup()
    }
    return (
        <GlobalMainPopup title={'넷워크 변경'}>
            <Flex className="py-6" justify="center">
                <p>넷워크를 변경하시겠습니까?</p>
            </Flex>
            <Flex justify="between" gap={2} width="100%">
                <OutlineBtn onClick={hideGlobalPopup}>취소</OutlineBtn>
                <Button onClick={handleChangeNetwork}>넷워크 변경</Button>
            </Flex>
        </GlobalMainPopup>
    )
}

export default ChangeNetworkPopup
