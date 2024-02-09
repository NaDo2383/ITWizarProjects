// import { JsxChildren } from 'a/common/types/common'
import React, { createContext, useState, useContext } from 'react'

const AccordionContext = createContext({})

const AccordionProvider = ({ children }) => {
    const [activeAccordionId, setActiveAccordionId] = useState(null)

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
