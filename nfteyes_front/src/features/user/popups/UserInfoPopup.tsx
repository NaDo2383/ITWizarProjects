import MainPopup from 'common/popup/_partials/MainPopup'
import { usePopupCtx } from 'common/popup/usePopupCtx'
import Flex from 'components/ui/containers/flex/Flex'
import React from 'react'

function UserInfoPopup(): JSX.Element {
    const { hideAllPopups } = usePopupCtx()
    return (
        <MainPopup title="User info">
            <Flex gap={10} column>
                <button onClick={() => hideAllPopups()}>Ok</button>
            </Flex>
        </MainPopup>
    )
}

export default UserInfoPopup
