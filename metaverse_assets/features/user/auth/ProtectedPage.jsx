import { useGlobalCtx } from 'a/common/global/useGlobalCtx'
import { getAuthToken, isTokenEnded } from 'a/common/token/token'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function ProtectedPage({ children }) {
    const { push } = useRouter()
    const { authState } = useGlobalCtx()
    const token = getAuthToken()
    const isTokenEnd = isTokenEnded(token)

    if (isTokenEnd) {
        push('/')
        return null
    }

    useEffect(() => {
        if (!authState) {
            // push('/')
        }
    }, [authState])

    return <>{children}</>
}

export default ProtectedPage
