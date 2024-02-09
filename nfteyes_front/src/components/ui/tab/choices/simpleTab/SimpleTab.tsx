import React from 'react'
import Tab from '../../Tab'
import SimpleTabHeader from './SimpleTabHeader'
import SimpleTabPanels from './SimpleTabPanels'
import { TTab } from '../../store/_type'

function SimpleTab(props: TTab): JSX.Element {
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
