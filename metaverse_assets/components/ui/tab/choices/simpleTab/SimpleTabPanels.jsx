import React from 'react'
import { useTabCtx } from '../../store/useTabCtx'
import SimpleTabPanel1 from './panels/SimpleTabPanel1'
import SimpleTabPanel2 from './panels/SimpleTabPanel2'
import SimpletTabPanel3 from './panels/SimpletTabPanel3'
import styled from 'styled-components'

const simpleTabPanels = [
    <SimpleTabPanel1 key={'faefsrf'} />,
    <SimpleTabPanel2 key={'faefsr1'} />,
    <SimpletTabPanel3 key={'faefsras'} />,
]
function SimpleTabPanels() {
    const { activeTabId } = useTabCtx()

    return (
        <SimpleTabPanel className="p-10 bg-blue overflow-hidden">
            {simpleTabPanels[activeTabId]}
        </SimpleTabPanel>
    )
}
const SimpleTabPanel = styled.div`
    padding: 10px;
    background-color: blue;
    overflow: hidden;
`
export default SimpleTabPanels
