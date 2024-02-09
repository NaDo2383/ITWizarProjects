import { useEffect } from 'react'
import useJwtAuth from './useJwtAuth'
import { parseToken, getToken } from 'a/common/token/token'
import { useGlobalCtx } from 'a/common/global/useGlobalCtx'
import { usePathname } from 'next/navigation'
import useToken from 'a/common/token/useToken'

function useCheckToken() {
    const { authState, setTokenIntoAuthState } = useGlobalCtx()
    const { logoutUser } = useJwtAuth()
    const pathname = usePathname()
    const { token } = useToken()

    function isTokenExpired(tkn) {
        const tokenExpirationTime = parseToken(tkn)
        const currentTime = new Date().getTime()
        return currentTime > tokenExpirationTime
    }
    // САНАМЖ: cookie - д байгаа token болон authState - д байгаа token - нууд ялгаатай ойлголтууд
    // Тиймээс доорхи кодонд дураараа бүү гар хүр!!!
    useEffect(() => {
        if (authState?.token) {
            // token - ны хугацаа дууссан бол
            const isExpired = isTokenExpired(authState?.token)
            if (isExpired) {
                logoutUser()
            }
        }
    }, [authState?.token, logoutUser, pathname])

    useEffect(() => {
        // full refresh хийх болгонд token дуусаагүй бол
        // cookie - ээс globalState рүү дуусаагүй token - ийг set хийж өгнө
        if (typeof window !== 'undefined') {
            const cookieToken = getToken()
            if (cookieToken) {
                const isExpired = isTokenExpired(cookieToken)
                if (!isExpired) {
                    setTokenIntoAuthState(cookieToken)
                }
            }
        }
    }, [token])
}

export default useCheckToken
