import React from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { UserProvider } from 'features/user/store/useUserCtx'
import { PopupProvider } from 'common/popup/usePopupCtx'
const UserPage = dynamic(() => import('features/user/UserPage'))

const User: NextPage = () => {
    return (
        <PopupProvider>
            <UserProvider>
                <UserPage />
            </UserProvider>
        </PopupProvider>
    )
}

export default User
