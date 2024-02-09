import { useEffect, useState } from 'react'
import { getToken, parseToken } from './token'
import { useSiteGlobalCtx } from '../global/useSiteGlobalCtx'

function useToken() {
    const [token, setToken] = useState<string | null>(null)
    const [parsedToken, setParsedToken] = useState<any>(null)
    const { authState } = useSiteGlobalCtx()
    useEffect(() => {
        const tkn = getToken()
        const parsedToken = tkn && parseToken(tkn!)
        setToken(tkn!)
        setParsedToken(parsedToken)
    }, [authState])

    return { token, parsedToken }
}

export default useToken
