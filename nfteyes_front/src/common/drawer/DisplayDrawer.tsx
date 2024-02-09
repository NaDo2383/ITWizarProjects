import React from 'react'
import { DRAWER_TYPES, useDrawerCtx } from './useDrawerCtx'
import Flex from 'components/ui/containers/flex/Flex'

function DisplayDrawer() {
    const { showDrawer } = useDrawerCtx()
    return (
        <Flex gap={10}>
            <button onClick={() => showDrawer({ drawerType: DRAWER_TYPES.EXAMPLE1 })}>show example1 drawer</button>
            <button onClick={() => showDrawer({ drawerType: DRAWER_TYPES.EXAMPLE1 })}>show example2 drawer</button>
        </Flex>
    )
}

export default DisplayDrawer
