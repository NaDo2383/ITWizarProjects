import { CookieName } from 'libs/constants'

export function getCookie(name: string) {
    const value = typeof window !== 'undefined' && document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
    return value ? unescape(value[2]) : undefined
}

export function setCookie(name: string, value: string, daysToExpire: number) {
    const date = new Date()
    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000)
    const expires = 'expires=' + date.toUTCString()
    document.cookie = ((name + '=' + value) as string) + '; ' + expires + '; path=/'
}

export function removeCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

export function setJWTCookie(token: string) {
    document.cookie = `${CookieName.TOKEN}=${token};path=/`
}
