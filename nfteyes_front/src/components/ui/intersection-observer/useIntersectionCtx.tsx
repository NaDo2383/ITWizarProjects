import React, { createContext, useState, useContext, FC } from 'react'

interface IIntersectionCtx {
    inView: boolean
    setInView: React.Dispatch<React.SetStateAction<boolean>>
}

const IntersectionContext = createContext<IIntersectionCtx>({} as IIntersectionCtx)

const IntersectionProvider: FC<JsxChildren> = ({ children }) => {
    const [inView, setInView] = useState<boolean>(false)

    return (
        <IntersectionContext.Provider
            value={{
                inView,
                setInView,
            }}
        >
            {children}
        </IntersectionContext.Provider>
    )
}

const useIntersectionCtx = () => useContext(IntersectionContext)

export { IntersectionContext, IntersectionProvider, useIntersectionCtx }
