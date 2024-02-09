// import { useSiteGlobalCtx } from 'common/global/useSiteGlobalCtx'
import { getToken as getAuthToken, isTokenEnded } from 'common/token/token'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

// import React, { useEffect } from 'react'

function ProtectedPage({ children }: JsxChildren) {
    const { push } = useRouter()
    // const { authState } = useSiteGlobalCtx()
    const token = getAuthToken()
    const isTokenEnd = isTokenEnded(token!)

    useEffect(() => {
        if (isTokenEnd) {
            push('/login')
        }
    }, [])

    return <>{children}</>
}

export default ProtectedPage
