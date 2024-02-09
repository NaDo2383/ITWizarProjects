import React from 'react'
import Tab from '../../Tab'
import SimpleTabHeader from './SimpleTabHeader'
import SimpleTabPanels from './SimpleTabPanels'

function SimpleTab(props) {
    return (
        <Tab>
            <div>
                <SimpleTabHeader {...props} />
                <SimpleTabPanels />
            </div>
        </Tab>
    )
}

export default SimpleTab
