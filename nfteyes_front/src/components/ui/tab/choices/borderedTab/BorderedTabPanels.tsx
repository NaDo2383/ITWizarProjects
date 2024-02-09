import React from 'react'
import BTabPanel1 from './panels/BTabPanel1'
import BTabPanel3 from './panels/BTabPanel3'
import BTabPanel2 from './panels/BTabPanel2'
import { useTabCtx } from '../../store/useTabCtx'
import tw from 'tailwind-styled-components'
const borderedTabPanels: React.ReactNode[] = [
    <BTabPanel1 key={'dwadeafsfg'} />,
    <BTabPanel2 key={'fwafsfsrgr'} />,
    <BTabPanel3 key={'rgrgdsfea'} />,
]
function BorderedTabPanels() {
    const { activeTabId } = useTabCtx()
    return <BorderedPanel>{borderedTabPanels[activeTabId]}</BorderedPanel>
}
const BorderedPanel = tw.div`
    relative
    min-h-[50px]
    p-10
    bg-blue
    border
    border-gray-900
    border-t-0
    rounded-bl-[10px]
    rounded-br-[10px]

`
export default BorderedTabPanels
