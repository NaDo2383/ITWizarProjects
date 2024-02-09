import React from 'react'
import { DRAWER_TYPES, useDrawerCtx } from './useDrawerCtx'
import ExampleDrawer1 from './choices/ExampleDrawer1'
import ExampleDrawer2 from './choices/ExampleDrawer2'

function Drawer() {
    const { drawerType } = useDrawerCtx()

    function renderComponent() {
        switch (drawerType) {
            case DRAWER_TYPES.EXAMPLE1: {
                return <ExampleDrawer1 />
            }
            case DRAWER_TYPES.EXAMPLE2: {
                return <ExampleDrawer2 />
            }
            default: {
                return null
            }
        }
    }
    return <>{renderComponent()}</>
}

export default Drawer
