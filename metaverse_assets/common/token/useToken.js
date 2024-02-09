import { useEffect, useState } from 'react'
import { getToken, parseToken } from './token'
import { useGlobalCtx } from '../global/useGlobalCtx'

function useToken() {
    const [token, setToken] = useState(null)
    const [parsedToken, setParsedToken] = useState(null)
    const { authState } = useGlobalCtx()
    useEffect(() => {
        const tkn = getToken()
        const parsedToken = tkn && parseToken(tkn)
        setToken(tkn)
        setParsedToken(parsedToken)
    }, [authState])

    return { token, parsedToken }
}

export default useToken
