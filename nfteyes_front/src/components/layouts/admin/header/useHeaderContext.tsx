import React, { createContext, useState, useContext, FC } from 'react'

interface IHeaderCtx {
    isOpenMobileMenu: boolean
    setIsOpenMobileMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const HeaderContext = createContext<IHeaderCtx>({} as IHeaderCtx)

const HeaderProvider: FC<JsxChildren> = ({ children }) => {
    const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<boolean>(false)

    return (
        <HeaderContext.Provider
            value={{
                isOpenMobileMenu,
                setIsOpenMobileMenu,
            }}
        >
            {children}
        </HeaderContext.Provider>
    )
}

const useHeaderCtx = () => useContext(HeaderContext)

export { HeaderContext, HeaderProvider, useHeaderCtx }
