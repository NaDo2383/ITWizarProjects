import React from 'react'
import { AccordionProvider } from './store/useAccordionCtx'
// import { JsxChildren } from 'a/common/types/common'

function Accordion({ children }) {
    return <AccordionProvider>{children}</AccordionProvider>
}

export default Accordion
