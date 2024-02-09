import useTab from 'Components/ui/tab/useTab'
import React from 'react'
import { licensePanels } from './licensePanels'

function LicenseTabPanels() {
    const { activeTabId } = useTab()
    
  return (
    <div>
        { licensePanels[activeTabId] }
    </div>
  )
}

export default LicenseTabPanels