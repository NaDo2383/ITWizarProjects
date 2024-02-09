import React from 'react'
import Tab from '../../Tab'
import BorderedTabHeader from './BorderedTabHeader'
import BorderedTabPanels from './BorderedTabPanels'
import { TTab } from '../../store/_type'

function BorderedTab(props: TTab) {
    return (
        <Tab>
            <div>
                <BorderedTabHeader {...props} />
                <BorderedTabPanels />
            </div>
        </Tab>
    )
}

export default BorderedTab
