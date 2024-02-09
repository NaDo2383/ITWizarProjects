import React from 'react'
import tw from 'tailwind-styled-components'
import { Variants, motion } from 'framer-motion'
import { useAccordionCtx } from './store/useAccordionCtx'

const variants: Variants = {
    visible: {
        opacity: 1,
        height: 'auto',
        y: 0,
        transition: {
            duration: 0.1,
            dump: 0.2,
        },
    },
    hidden: {
        opacity: 0,
        height: 0,
        transition: {
            duration: 0.1,
            dump: 0.2,
        },
    },
}

type TAccordionPanel = {
    children: React.ReactNode
    id: number
}

function AccordionPanel({ id, children }: TAccordionPanel): JSX.Element {
    const { activeAccordionId } = useAccordionCtx()
    const isopen: boolean = activeAccordionId === id
    return (
        <div className="overflow-hidden">
            <AccordionPanelTw
                id={`content-${id}`}
                isopen={isopen.toString()}
                initial="hidden"
                animate={isopen ? 'visible' : 'hidden'}
                variants={variants}
                tabIndex={isopen ? 0 : -1}
            >
                {/* Pass children as a prop */}
                {children}
            </AccordionPanelTw>
        </div>
    )
}

interface IAccordionPanelTw extends React.ComponentProps<typeof motion.div> {
    isopen: string
}

const AccordionPanelTw = tw(motion.div)<IAccordionPanelTw>`
    ${(p) => (p.isopen ? 'p-10' : 'p-0')}
    bg-emerald-300
    transition
`

export default AccordionPanel
