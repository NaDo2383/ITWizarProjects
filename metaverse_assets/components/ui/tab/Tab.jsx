import React from 'react'
import { TabProvider } from './store/useTabCtx'

function Tab({ children }) {
    return <TabProvider>{children}</TabProvider>
}

export default Tab
