import React, { createContext, useState, useContext } from 'react'

const GlobalContext = createContext({})

const GlobalProvider = ({ children }) => {
    const [globalItems, setGlobalItems] = useState(null)
    const [authState, setAuthState] = useState(null)
    const [isSidebar, setSidebar] = useState(false)
    const [web3Items, setWeb3Items] = useState()

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
                web3Items,
                setWeb3Items,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

const useGlobalCtx = () => {
    const context = useContext(GlobalContext)
    if (!context) throw new Error('useGlobalCtx must be used within a GlobalProvider')
    return context
}

export { GlobalContext, GlobalProvider, useGlobalCtx }
