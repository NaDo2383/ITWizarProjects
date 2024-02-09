import React from 'react'
import { useTabCtx } from '../../store/useTabCtx'
import SimpleTabPanel1 from './panels/SimpleTabPanel1'
import SimpleTabPanel2 from './panels/SimpleTabPanel2'
import SimpletTabPanel3 from './panels/SimpletTabPanel3'

const simpleTabPanels: React.ReactNode[] = [
    <SimpleTabPanel1 key={'faefsrf'} />,
    <SimpleTabPanel2 key={'faefsr1'} />,
    <SimpletTabPanel3 key={'faefsras'} />,
]
function SimpleTabPanels(): JSX.Element {
    const { activeTabId } = useTabCtx()

    return <div className="p-10 bg-blue overflow-hidden">{simpleTabPanels[activeTabId]}</div>
}

export default SimpleTabPanels
