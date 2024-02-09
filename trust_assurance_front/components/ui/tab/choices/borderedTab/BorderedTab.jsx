import React from 'react'
import Tab from '../../Tab'
import BorderedTabHeader from './BorderedTabHeader'
import BorderedTabPanels from './BorderedTabPanels'

function BorderedTab(props) {
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
