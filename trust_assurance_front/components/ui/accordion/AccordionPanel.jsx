import React from 'react'
import { motion } from 'framer-motion'
import { useAccordionCtx } from './store/useAccordionCtx'
import styled from 'styled-components'

const variants = {
    visible: {
        opacity: 1,
        height: 'auto'
    },
    hidden: {
        opacity: 0,
        height: 0
    },
}

function AccordionPanel({ id, children }) {
    const { activeAccordionId } = useAccordionCtx()
    const isopen = activeAccordionId === id
    return (
        <div className="overflow-hidden">
            <AccordionPanelTw
                id={`content-${id}`}
                isopen={isopen.toString()}
                initial="hidden"
                animate={isopen ? 'visible' : 'hidden'}
                variants={variants}
                tabIndex={isopen ? 0 : -1}
                transition={{ duration: 0.4, linear: true }}
            >
                {/* Pass children as a prop */}
                {children}
            </AccordionPanelTw>
        </div>
    )
}

const AccordionPanelTw = styled(motion.div)`
    padding: 5px;
`

export default AccordionPanel
