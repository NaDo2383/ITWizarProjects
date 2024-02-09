import React from 'react'
import Accordion from '../../Accordion'
import { accordionItems } from '../../store/accordion-data'
import SimpleAccordionItem from './SimpleAccordionItem'
function SimpleAccordion() {
    return (
        <Accordion>
            <div className=" bg-blue">
                {accordionItems.map((accordion, idx) => (
                    <SimpleAccordionItem key={'accordion-' + idx} {...accordion} />
                ))}
            </div>
        </Accordion>
    )
}

export default SimpleAccordion
