import { useState } from "react"
import { useCrud } from "@/common/axios/useCrud"
import {
    setTokenIntoCookie,
    endToken,
    setRefreshTokenIntoCookie,
} from "@/common/token/token"
import { useGlobalCtx } from "@/common/global/useGlobalCtx"
import { setSessionCookie, removeCookie } from "@/common/storage/cookieStorage"
import { CookieName } from "@/libs/constants"
import { useUserCtx } from "../useUserCtx"
import { useGlobalPopupCtx } from "@/common/popup/useGlobalPopupCtx"
import { GLOBAL_POPUP_TYPES } from "@/common/popup/globalPopupRegistration"

function useJwtAuth() {
    const [isLoading, setIsLoading] = useState(false)
    const { setTokenIntoAuthState, authState, setAuthState } = useGlobalCtx()
    const { postData, getData } = useCrud()
    const { setUserInfo } = useUserCtx()
    const { showGlobalPopup } = useGlobalPopupCtx()
    async function loginWallet(wallet_address) {
        try {
            const res = await postData(
                "/user/login/wallet",
                {
                    wallet_address,
                },
                true
            )
            return res
        } catch (err) {
            console.error(err)
        }
    }

    async function loginUser(payload) {
        // setIsLoading(true)
        try {
            const res = await postData("/user/login", payload)
            if (res.status === 400) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: "아이디 또는 비밀번호를 정확하게 입력해주세요.",
                })
                return { success: false }
            }

            if (res.status === 401) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: "아이디 또는 비밀번호를 정확하게 입력해주세요.",
                })
                return { success: false }
            }
            if (res.status === 404) {
                alert("not found this user!")
                return { success: false }
            }

            setTokenIntoCookie(res.data?.token)
            setRefreshTokenIntoCookie(res.data?.refreshToken)
            setSessionCookie(CookieName.LOGGED_USER, res.data)
            setAuthState(res.data)
            if (res.status === 200) {
                if (res.data.login === "pattern_disabled") {
                    return { success: false }
                }
                if (res.data.login === true) {
                    return { success: true }
                }
            }
        } catch (e) {
            console.error(e)
            return { success: false }
        } finally {
            // setIsLoading(false)
        }
    }

    async function logoutUser() {
        // const res = await getData('/users/logout')
        endToken()
        setAuthState(null)
        removeCookie(CookieName.LOGGED_USER)
        setUserInfo(null)
    }

    async function checkId(id) {
        try {
            const res = await postData("/user/id/confirm", { id })
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function signUpUser(payload) {
        try {
            const res = await postData("/user/signup", payload)
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function requestVerify(email) {
        try {
            const res = await postData("/user/email/certification", {
                email,
                option: "signup",
            })
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function accessToken() {
        try {
            const res = await postData("/user/accessToken")
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function reflashToken() {
        try {
            const res = await postData("/user/reflashToken")
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function userConfirm(userId) {
        try {
            const res = await postData(`/user/${userId}/confirm`)
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function requestResetPassword(email) {
        try {
            const res = await postData(`/user/email/certification`, {
                email,
                option: "password",
            })
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function getTemporaryPassword(payload) {
        try {
            const { email, id } = payload
            const res = await postData(`/user/email/certification`, {
                email,
                option: "tempPasswordReset",
                id,
            })
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function changePassword(changedPassword) {
        try {
            const res = await postData("/user/update/info", {
                password: changedPassword,
            })
            return res
        } catch (e) {
            console.error(e)
        }
    }

    return {
        getTemporaryPassword,
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
        userConfirm,
        changePassword,
        requestResetPassword,
    }
}
export default useJwtAuth
