import { useEffect, useState } from "react"
import { getToken, parseToken, setTokenIntoCookie } from "./token"
import { useGlobalCtx } from "../global/useGlobalCtx"
import { getCookie } from "../storage/cookieStorage"
import { CookieName } from "@/libs/constants"
import { useRouter } from "next/navigation"
import useUser from "@/features/user/useUser"
import { useUserCtx } from "@/features/user/useUserCtx"

function useToken() {
    const [token, setToken] = useState(null)
    const [parsedToken, setParsedToken] = useState(null)
    const { authState, setAuthState } = useGlobalCtx()
    const { setUserInfo } = useUserCtx()
    const { push } = useRouter()
    const { checkRefreshToken, getUserInfo } = useUser()

    useEffect(() => {
        const tkn = getCookie(CookieName.TOKEN)
        const parsedToken = tkn && parseToken(tkn)
        setToken(tkn)
        setParsedToken(parsedToken)
    }, [authState])

    async function getAuthToken() {
        const token = getCookie(CookieName.TOKEN)
        if (!token) {
            const refreshToken = getCookie(CookieName.REFRESH_TOKEN)
            if (!refreshToken) {
                push("/", null, { shallow: true })
                return
            } else {
                const result = await checkRefreshToken({
                    reflashToken: refreshToken,
                }).then(async (res) => {
                    if (res.validToken === "pass") {
                        await getUserInfo(res.accessToken).then((result) => {
                            if (result.status === 200) {
                                setUserInfo(result.data)
                                const userObj = {
                                    login: true,
                                    name: result.data.name,
                                    nickname: result.data.nickname,
                                    token: res.accessToken,
                                    refreshToken: refreshToken,
                                }
                                setAuthState(userObj)
                            }
                        })
                        const accessToken = res.accessToken
                        return accessToken
                    }
                })
                return result
            }
        } else {
            return token
        }
    }

    return { token, parsedToken, getAuthToken }
}

export default useToken
