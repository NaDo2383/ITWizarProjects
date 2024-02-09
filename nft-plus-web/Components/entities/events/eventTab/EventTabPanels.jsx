import React from 'react'
import EventTabPanel1 from './EventTabPanel1'
import EventTabPanel2 from './EventTabPanel2'
import EventTabPanel3 from './EventTabPanel3'
import useTab from 'Components/ui/tab/useTab'

function EventTabPanels() {
  const evntPanels = [
    <EventTabPanel1 key={'evnt-1'} />,
    <EventTabPanel2 key={'evnt-2'} />,
    <EventTabPanel3 key={'evnt-3'} />
  ]
  const { activeTabId } = useTab()

  return (
    <div className='sm:mb-[200px] mb-[60px]'>
      {evntPanels[activeTabId]}
    </div>
  )
}

export default EventTabPanels