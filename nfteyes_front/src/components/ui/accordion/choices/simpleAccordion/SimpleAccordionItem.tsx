import React from 'react'
import { TAccItem } from '../../store/accordion-data'
import tw from 'tailwind-styled-components'
import AccordionPanel from '../../AccordionPanel'
import { useAccordionCtx } from '../../store/useAccordionCtx'
import useAccordion from '../../store/useAccordion'

function SimpleAccordionItem(props: TAccItem) {
    const { id, title, content } = props
    const { activeAccordionId, setActiveAccordionId } = useAccordionCtx()
    const { handleKeyDown } = useAccordion()
    const isOpen = activeAccordionId === id
    function handleClick() {
        if (isOpen) {
            setActiveAccordionId(null)
        } else {
            setActiveAccordionId(id)
        }
    }
    console.log('activeAccordionId', activeAccordionId)

    return (
        <SimpleAccItemTw>
            <h4
                role="button"
                tabIndex={isOpen ? 0 : -1}
                aria-expanded={isOpen}
                aria-controls={`content-${id}`}
                className="cursor-pointer focus:outline-none"
                onClick={handleClick}
                onKeyDown={(e) => handleKeyDown(e, handleClick)}
            >
                {title}
            </h4>
            <AccordionPanel id={id}>{content}</AccordionPanel>
        </SimpleAccItemTw>
    )
}

const SimpleAccItemTw = tw.div`
    p-10
`

export default SimpleAccordionItem
