import { useCallback, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
function useUrl() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const checkFirstUrl = useCallback((): string => {
        const firstUrl = pathname?.split('/')[1]
        return firstUrl
    }, [pathname])

    const isAdminUrl = useCallback((): boolean => {
        const url = checkFirstUrl()
        return url === 'admin'
    }, [pathname])

    const isNoLayoutUrl = useCallback(() => {
        const url = checkFirstUrl()
        return url === 'login' || url === 'sign-up' || url === 'reset-password'
    }, [pathname])

    const setQueryString = useCallback(
        (name: string, value: string): string => {
            // debugger
            const params = new URLSearchParams(searchParams)
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )
    const isAdminSite: boolean = isAdminUrl()

    useEffect(() => {
        const body = typeof window !== 'undefined' && document.getElementById('body')
        if (body) {
            if (isAdminSite) body.classList.add('overflow-hidden')
            else body.classList.remove('overflow-hidden')
        }
    }, [pathname])

    return { pathname, checkFirstUrl, isAdminUrl, setQueryString, isAdminSite, isNoLayoutUrl }
}

export default useUrl
