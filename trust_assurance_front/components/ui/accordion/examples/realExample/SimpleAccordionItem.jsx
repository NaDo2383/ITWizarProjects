import React from 'react'
import AccordionPanel from '../../AccordionPanel'
import { useAccordionCtx } from '../../store/useAccordionCtx'
import useAccordion from '../../store/useAccordion'
import styled from 'styled-components'

function SimpleAccordionItem(props) {
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

const SimpleAccItemTw = styled.div`
    padding: 10px;
`

export default SimpleAccordionItem
