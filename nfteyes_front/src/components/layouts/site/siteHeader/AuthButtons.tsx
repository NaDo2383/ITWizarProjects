import React from 'react'
import useJwtAuth from 'common/auth/jwt/useJwtAuth'
import { useGlobalPopupCtx } from 'common/popup/globalPopups/useGlobalPopupCtx'
import { GLOBAL_POPUP_TYPES } from 'common/popup/globalPopups/globalPopupRegistration'
import { useSiteGlobalCtx } from 'common/global/useSiteGlobalCtx'
import useCheckToken from 'common/auth/jwt/useCheckToken'

function AuthButtons(): JSX.Element {
    const { showGlobalPopup } = useGlobalPopupCtx()
    const { authState } = useSiteGlobalCtx()
    const { logoutUser } = useJwtAuth()
    useCheckToken()

    console.log('authState', authState)

    return (
        <>
            {authState?.token ? (
                <button onClick={async () => await logoutUser()}>Logout</button>
            ) : (
                <button onClick={() => showGlobalPopup(GLOBAL_POPUP_TYPES.LOGIN)}>login user</button>
            )}
        </>
    )
}

export default AuthButtons
