import Tab from 'a/components/ui/tab/Tab'
import React from 'react'
import StepperTabHeader from './StepperTabHeader'
import StepperPanels from './StepperPanels'

function StepperTab() {
    return (
        <Tab>
            <div className="px-4">
                <StepperTabHeader />
                <StepperPanels />
            </div>
        </Tab>
    )
}

export default StepperTab
