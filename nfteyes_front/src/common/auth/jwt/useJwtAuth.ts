import { useCrud } from 'common/axios/useCrud'
import { useSiteGlobalCtx } from 'common/global/useSiteGlobalCtx'
import { TLoginUserForm } from './_types'
import { setToken, endToken, setTokenIntoCookie } from '../../token/token'
import { useState } from 'react'
import { Local } from 'libs/constants'
import { setLocal } from 'common/storage/localStorage'

type TLoginRes = {
    success: boolean
    message: string
    token: string
    result?: any
}

type TLogoutRes = Pick<TLoginRes, 'message'>

function useJwtAuth() {
    const [isLoading, setIsLoading] = useState(false)
    const { setTokenIntoAuthState, setAuthState } = useSiteGlobalCtx()
    const { postData, getData } = useCrud()

    async function loginUser(
        payload: TLoginUserForm
    ): Promise<{ success: boolean; errorCode?: number; message?: string }> {
        setIsLoading(true)
        try {
            const res = await postData<TLoginRes>('/authenticate', payload)

            if (res.statusCode === 400) {
                return { success: false, errorCode: res.statusCode, message: res.message }
            }
            if (res.statusCode === 404) {
                return { success: false, errorCode: res.statusCode, message: res.message }
            }
            if (!res.success) {
                alert(res)
                return { success: false, errorCode: res.statusCode, message: res.message }
            }
            setToken(res.result?.token!)
            // setTokenIntoAuthState(res?.data?.token!)
            setAuthState({ ...res?.result?.result, token: res.result?.token })
            document.cookie = `nft_eyes_user_info=${JSON.stringify(res?.result?.result)};path=/`
            return { success: true }
        } catch (e: unknown) {
            console.error(e)
            return { success: false }
        } finally {
            setIsLoading(false)
        }
    }

    async function logoutUser(): Promise<void> {
        const res = await getData<TLogoutRes>('/users/logout')
        console.log('logut', res)
        endToken()
        setTokenIntoAuthState(null)
    }

    async function loginWallet(walletAddress: string) {
        try {
            const res: any = await postData('/authenticate', { walletAddress })
            setTokenIntoCookie(res.data?.token)
            setLocal(Local.LOGGED_USER, res?.data)

            setAuthState(res.data)
            return res
        } catch (err) {
            console.error(err)
        }
    }

    async function requestResetPassword(username: string | null) {
        try {
            const res = await postData(`/recover-password`, {
                username,
            })
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function changePassword(payload: any) {
        try {
            const res = await postData('/reset-password', payload)
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function signUpUser(payload: any) {
        try {
            const res = await postData('/register', payload)
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function requestVerify(email: string) {
        try {
            const res = await postData('/mail/signup', {
                email,
            })
            return res
        } catch (e) {
            console.error(e)
        }
    }

    return {
        loginUser,
        logoutUser,
        isLoading,
        setIsLoading,
        loginWallet,
        requestResetPassword,
        changePassword,
        signUpUser,
        requestVerify,
    }
}
export default useJwtAuth
