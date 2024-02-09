import React from 'react'
import { motion, Variants } from 'framer-motion'
import tw from 'tailwind-styled-components'

const variants: Variants = {
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            dump: 0.3,
        },
    },
    hidden: {
        opacity: 0,
        x: -1000,
        transition: {
            duration: 0.5,
            dump: 0.3,
        },
    },
}

function TabPanel({ children }: JsxChildren): JSX.Element {
    return (
        <TabPanelTw initial="hidden" animate="visible" variants={variants}>
            {children}
        </TabPanelTw>
    )
}
interface ITabPanelTw extends React.ComponentProps<typeof motion.div> {}
const TabPanelTw = tw(motion.div)<ITabPanelTw>`

`

export default TabPanel
