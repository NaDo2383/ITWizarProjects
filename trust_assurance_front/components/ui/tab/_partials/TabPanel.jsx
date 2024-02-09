import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components';

const variants = {
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

function TabPanel({ children }) {
    return (
        <TabPanelTw initial="hidden" animate="visible" variants={variants}>
            {children}
        </TabPanelTw>
    )
}
const TabPanelTw = styled(motion.div)`

`

export default TabPanel
