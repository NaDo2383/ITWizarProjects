import React, { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
export interface IBackdrop {
    children: ReactNode
}

function Backdrop({ children }: IBackdrop) {
    return (
        <AnimatePresence>
            <BackdropOverlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                {children}
            </BackdropOverlay>
        </AnimatePresence>
    )
}

const BackdropOverlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`
export default Backdrop
