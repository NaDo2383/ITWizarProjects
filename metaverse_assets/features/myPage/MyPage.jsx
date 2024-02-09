import React from 'react'
import MyPageTab from './tab/MyPageTab'
import { Wrapper } from 'a/components/ui/containers/Wrapper'
import { PopupProvider } from 'a/common/popup/usePopupCtx'

function MyPage() {
    return (
        <PopupProvider>
            <Wrapper>
                <MyPageTab />
            </Wrapper>
        </PopupProvider>
    )
}

export default MyPage
