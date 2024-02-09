import React, { createContext, useState, useContext, useCallback } from "react"

const GlobalContext = createContext({})

const GlobalProvider = ({ children }) => {
    const [globalItems, setGlobalItems] = useState(null)
    const [authState, setAuthState] = useState(null)
    const [isSidebar, setSidebar] = useState(false)
    const [isTokenVerified, setIsTokenVerified] = useState(false)
    const [isLoadingWithContract, setLoadingWithContract] = useState(false)
    const [loadingText, setLoadingText] = useState("트랜잭션 컨펌 중")

    // pages global states:
    const [myPageState, setMyPageState] = useState(null)

    const setTokenIntoAuthState = (token) => {
        setAuthState((prev) => ({ ...prev, token }))
    }

    return (
        <GlobalContext.Provider
            value={{
                isSidebar,
                setSidebar,
                globalItems,
                setGlobalItems,
                authState,
                setAuthState,
                setTokenIntoAuthState,
                myPageState,
                setMyPageState,
                isTokenVerified,
                setIsTokenVerified,
                isLoadingWithContract,
                setLoadingWithContract,
                loadingText,
                setLoadingText,
            }}>
            {children}
        </GlobalContext.Provider>
    )
}

const useGlobalCtx = () => {
    const context = useContext(GlobalContext)
    if (!context) throw new Error("useGlobalCtx must be used within a GlobalProvider")
    return context
}

export { GlobalContext, GlobalProvider, useGlobalCtx }
