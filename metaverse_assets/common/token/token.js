import jwt from 'jsonwebtoken'
import { getCookie, removeCookie, setAuthJWTCookie } from 'common/storage/cookieStorage'
import { CookieName } from 'libs/constants'

export function getAuthToken() {
    return getCookie(CookieName.TOKEN)
}

export function setTokenIntoCookie(token) {
    setAuthJWTCookie(token)
}

export function endToken() {
    return window !== undefined && removeCookie(CookieName.TOKEN)
}

export function parseToken(token) {
    try {
        const decodedPayload = jwt.decode(token)

        if (decodedPayload) {
            return decodedPayload
        }

        return null
    } catch (error) {
        console.error('Token parse error:', error)
        return null
    }
}

export function getTokenExpiration(token) {
    const decodedToken = jwt.decode(token, { complete: true })
    return decodedToken?.payload?.exp * 1000 // Convert to milliseconds
}

export function isTokenEnded(token) {
    const calcedToken = token ? getTokenExpiration(token) : Date.now() - 1000
    const isEnded = calcedToken < Date.now()
    return isEnded
}
