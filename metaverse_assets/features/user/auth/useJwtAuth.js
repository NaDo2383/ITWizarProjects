import { useState } from 'react'
import { useCrud } from 'common/axios/useCrud'
import { setTokenIntoCookie, endToken } from 'common/token/token'
import { useGlobalCtx } from 'common/global/useGlobalCtx'
import { Local } from 'libs/constants'
import { useUserCtx } from '../useUserCtx'
import { useGlobalPopupCtx } from 'a/common/popup/globalPopups/useGlobalPopupCtx'
import { GLOBAL_POPUP_TYPES } from 'a/common/popup/globalPopups/globalPopupRegistration'
import { setLocal } from 'a/common/storage/localStorage'

function useJwtAuth() {
    const [isLoading, setIsLoading] = useState(false)
    const { setAuthState } = useGlobalCtx()
    const { showGlobalPopup } = useGlobalPopupCtx()
    const { postData } = useCrud()
    const { setUserInfo } = useUserCtx()

    async function loginWallet(walletAddress) {
        try {
            const res = await postData('/authenticate', { walletAddress })
            setTokenIntoCookie(res.data?.token)
            setLocal(Local.LOGGED_USER, res?.data)

            setAuthState(res.data)
            return res
        } catch (err) {
            console.error(err)
        }
    }

    async function loginUser(payload) {
        try {
            const res = await postData('/login', payload)
            if (res.status === 400) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: '아이디 또는 비밀번호가 일치하지 않습니다.',
                })
                return { success: false }
            }
            if (res.status === 401) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: '아이디 또는 비밀번호가 일치하지 않습니다.',
                })
                return { success: false }
            }
            if (res.status === 404) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: '등록되지 않은 사용자입니다.',
                })
                return { success: false }
            }

            setTokenIntoCookie(res.data?.token)
            setLocal(Local.LOGGED_USER, res?.data)
            setAuthState(res.data)

            return { success: true }
        } catch (e) {
            console.error(e)
            return { success: false }
        }
    }

    async function logoutUser() {
        // const res = await getData('/users/logout')
        endToken()
        setAuthState(null)
        setLocal(Local.LOGGED_USER, null)
        setUserInfo(null)
    }

    async function checkId(userName) {
        try {
            const res = await postData('/checkUserId/' + userName)
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function signUpUser(payload) {
        try {
            const res = await postData('/register', payload)
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function requestVerify(email) {
        try {
            const res = await postData('/mail/signup', {
                email,
            })
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function accessToken() {
        try {
            const res = await postData('/user/accessToken')
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function reflashToken() {
        try {
            const res = await postData('/user/reflashToken')
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function requestResetPassword(email) {
        try {
            const res = await postData(`/mail/password-recovery`, {
                email,
            })
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function changePassword(payload) {
        try {
            const res = await postData('/password-reset', payload)
            return res
        } catch (e) {
            console.error(e)
        }
    }

    return {
        loginWallet,
        loginUser,
        logoutUser,
        isLoading,
        setIsLoading,
        checkId,
        signUpUser,
        requestVerify,
        accessToken,
        reflashToken,
        changePassword,
        requestResetPassword,
    }
}
export default useJwtAuth
