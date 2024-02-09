import React from 'react'
import BTabPanel1 from './panels/BTabPanel1'
import BTabPanel3 from './panels/BTabPanel3'
import BTabPanel2 from './panels/BTabPanel2'
import { useTabCtx } from '../../store/useTabCtx'
import styled from 'styled-components'
const borderedTabPanels = [
    <BTabPanel1 key={'dwadeafsfg'} />,
    <BTabPanel2 key={'fwafsfsrgr'} />,
    <BTabPanel3 key={'rgrgdsfea'} />,
]
function BorderedTabPanels() {
    const { activeTabId } = useTabCtx()
    return <BorderedPanel>{borderedTabPanels[activeTabId]}</BorderedPanel>
}
const BorderedPanel = styled.div`
    position: relative;
    min-height: 50px;
    padding: 10px;
    background-color: blue;
    border: 1px solid #000; /* Border color can be customized */
    border-top: 0;
    border-radius: 0 0 10px 10px;
`
export default BorderedTabPanels
