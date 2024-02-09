import React, { useRef } from 'react'
import styled from 'styled-components'
import { useDrawerCtx } from '../useDrawerCtx'
import { AnimatePresence, motion } from 'framer-motion'
import { useOnClickOutside } from 'usehooks-ts'
import CloseBtn from 'components/ui/button/CloseBtn'
import Flex from 'components/ui/containers/flex/Flex'
import { useSiteGlobalCtx } from 'common/global/useSiteGlobalCtx'

const drawerVariants = {
    open: { x: 0 },
    closed: { x: '-100vw' },
}

const drawerWrapperVariants = {
    open: { opacity: 0.5 },
    closed: { opacity: 0 },
}

interface IMainDrawer {
    title?: string
    children: React.ReactNode
}

function MainDrawer({ title, children }: IMainDrawer) {
    const ref = useRef(null)
    const { isDrawerOpen, closeDrawer } = useDrawerCtx()
    const { setIsClickedHamburger } = useSiteGlobalCtx()

    function handleClose() {
        closeDrawer()
        setIsClickedHamburger(false)
    }

    useOnClickOutside(ref, () => {
        handleClose()
    })

    return (
        <AnimatePresence>
            {isDrawerOpen && (
                <>
                    <MainDrawerLayer initial="closed" animate="open" exit="closed" variants={drawerWrapperVariants} />
                    <MainDrawerTw
                        ref={ref}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={drawerVariants}
                        transition={{
                            duration: 0.1,
                        }}
                    >
                        <Flex className="w-full justify-between items-center px-10 py-20">
                            <h3>{title}</h3>
                            <CloseBtn onClick={handleClose} />
                        </Flex>
                        <hr />
                        <MainDrawerContent>{children}</MainDrawerContent>
                    </MainDrawerTw>
                </>
            )}
        </AnimatePresence>
    )
}

const MainDrawerLayer = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    z-index: 9998;
`

const MainDrawerTw = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 300px;
    height: 100vh;
    padding: var(--space-10);
    background: white;
    z-index: 9999;
`

const MainDrawerContent = styled(motion.div)`
    padding-top: var(--space-10);
`

export default MainDrawer
