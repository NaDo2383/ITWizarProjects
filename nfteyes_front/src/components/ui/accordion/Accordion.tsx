import React from 'react'
import { AccordionProvider } from './store/useAccordionCtx'

function Accordion({ children }: JsxChildren): JSX.Element {
    return <AccordionProvider>{children}</AccordionProvider>
}

export default Accordion
