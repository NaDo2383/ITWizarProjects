import jwt, { JwtHeader, JwtPayload } from 'jsonwebtoken'
import { getCookie, removeCookie, setJWTCookie } from 'common/storage/cookieStorage'
import { CookieName } from 'libs/constants'

export function getToken() {
    return getCookie(CookieName.TOKEN)
}

export function setToken(token: string) {
    setJWTCookie(token)
}

export function setTokenIntoCookie(token: string) {
    setJWTCookie(token)
}

export function endToken() {
    return window !== undefined && removeCookie(CookieName.TOKEN)
}

export function parseToken(token: string): any | null {
    try {
        console.log('aa', token)
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
interface DecodedToken {
    header: JwtHeader
    payload: JwtPayload
}
export function getTokenExpiration(token: string): number | null {
    const decodedToken: DecodedToken | null = jwt.decode(token, { complete: true }) as DecodedToken
    return decodedToken?.payload?.exp! * 1000 // Convert to milliseconds
}

export function isTokenEnded(token: string): boolean {
    const calcedToken = token ? getTokenExpiration(token) : Date.now() - 1000
    const isEnded = calcedToken! < Date.now()
    return isEnded
}
