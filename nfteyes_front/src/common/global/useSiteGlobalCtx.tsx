import React, { createContext, useState, useContext, FC } from 'react'
import { TLoggedUser } from '../auth/jwt/_types'
// import { JsxChildren } from '../types/common'

interface ISiteGlobalCtx {
    siteGlobalItems: any
    setSiteGlobalItems: React.Dispatch<React.SetStateAction<any>>
    authState: TLoggedUser | null
    setAuthState: React.Dispatch<React.SetStateAction<TLoggedUser | null>>
    setTokenIntoAuthState: (token: string | null) => void
    isLoadingGlobal: boolean
    setIsLoadingGlobal: React.SetStateAction<any>
    isClickedHamburger: boolean
    setIsClickedHamburger: React.Dispatch<React.SetStateAction<boolean>>
    registeringMail: null | string
    setRegisteringMail: React.Dispatch<React.SetStateAction<null | string>>
}

const SiteGlobalContext = createContext<ISiteGlobalCtx>({} as ISiteGlobalCtx)

const SiteGlobalProvider: FC<JsxChildren> = ({ children }) => {
    const [siteGlobalItems, setSiteGlobalItems] = useState<any>(null)
    const [authState, setAuthState] = useState<TLoggedUser | null>(null)
    const [isLoadingGlobal, setIsLoadingGlobal] = useState<boolean>(false)
    const [isClickedHamburger, setIsClickedHamburger] = useState<boolean>(false)
    const [registeringMail, setRegisteringMail] = useState<string | null>(null)

    function setTokenIntoAuthState(token: string | null): void {
        setAuthState((prev) => ({ ...prev, token }))
    }

    return (
        <SiteGlobalContext.Provider
            value={{
                siteGlobalItems,
                setSiteGlobalItems,
                authState,
                setAuthState,
                setTokenIntoAuthState,
                isLoadingGlobal,
                setIsLoadingGlobal,
                isClickedHamburger,
                setIsClickedHamburger,
                registeringMail,
                setRegisteringMail,
            }}
        >
            {children}
        </SiteGlobalContext.Provider>
    )
}

const useSiteGlobalCtx = () => {
    const context = useContext(SiteGlobalContext)
    if (!context) throw new Error('useSiteGlobalCtx must be used within a SiteGlobalProvider')
    return context
}

export { SiteGlobalContext, SiteGlobalProvider, useSiteGlobalCtx }
