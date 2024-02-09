"use client"
export function getCookie(name) {
    const value =
        typeof window !== "undefined" &&
        document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)")
    return value ? unescape(value[2]) : undefined
}

export function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}
