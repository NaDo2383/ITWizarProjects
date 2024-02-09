import Tab from 'Components/ui/tab/Tab'
import React from 'react'
import EventDetailTabHeader from './EventDetailTabHeader'
import EventdetailTabPanel from './EventdetailTabPanel'

function EventDetailTab(props) {
  return (
    <Tab>
        <EventDetailTabHeader />
        <EventdetailTabPanel {...props} />
    </Tab>
  )
}

export default EventDetailTab