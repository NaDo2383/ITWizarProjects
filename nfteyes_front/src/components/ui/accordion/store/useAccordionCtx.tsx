import React, { createContext, useState, useContext, FC } from 'react'

interface IAccordionCtx {
    activeAccordionId: number | null
    setActiveAccordionId: React.Dispatch<React.SetStateAction<number | null>>
}

const AccordionContext = createContext<IAccordionCtx>({} as IAccordionCtx)

const AccordionProvider: FC<JsxChildren> = ({ children }) => {
    const [activeAccordionId, setActiveAccordionId] = useState<number | null>(null)

    return (
        <AccordionContext.Provider
            value={{
                activeAccordionId,
                setActiveAccordionId,
            }}
        >
            {children}
        </AccordionContext.Provider>
    )
}

const useAccordionCtx = () => useContext(AccordionContext)

export { AccordionContext, AccordionProvider, useAccordionCtx }
