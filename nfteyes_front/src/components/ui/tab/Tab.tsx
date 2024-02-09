import React from 'react'
import { TabProvider } from './store/useTabCtx'

type TTab = {
    children: React.ReactNode
}
function Tab({ children }: TTab) {
    return <TabProvider>{children}</TabProvider>
}

export default Tab
