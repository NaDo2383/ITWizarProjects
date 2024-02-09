import React from 'react'
import ParticipatePage from '../ParticipatePagel'
import useTab from 'Components/ui/tab/useTab'

function EventTabPanel3() {
    const { setActiveTabId } = useTab()
    
  return (
    <div>
        <ParticipatePage setTabIndexs={setActiveTabId} />
    </div>
  )
}

export default EventTabPanel3