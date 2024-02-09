import dynamic from 'next/dynamic'
import { PopupProvider } from 'a/common/popup/usePopupCtx'
import { Wrapper } from 'a/components/ui/containers/Wrapper'
import MyPage from 'a/features/myPage/MyPage'
// import ProtectedPage from 'a/features/user/auth/ProtectedPage'
const ProtectedPage = dynamic(() => import('features/user/auth/ProtectedPage'), {
    ssr: false,
})
import React from 'react'

export default function Mypage() {
    return (
        <PopupProvider>
            <ProtectedPage>
                <Wrapper>
                    <MyPage />
                </Wrapper>
            </ProtectedPage>
        </PopupProvider>
    )
}
