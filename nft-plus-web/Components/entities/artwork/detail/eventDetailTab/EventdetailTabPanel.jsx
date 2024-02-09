import useTab from 'Components/ui/tab/useTab'
import React from 'react'
import EventDetailPanel1 from './EventDetailPanel1'
import EventDetailPanel2 from './EventDetailPanel2'

function EventdetailTabPanel(props) {
    const { activeTabId } = useTab()
    const panels = [ 
      () => <EventDetailPanel1 {...props}  key={'edp-0'} />, 
      () => <EventDetailPanel2 {...props}  key={'edp-1'} /> 
    ];
    const renderPanelComponent = () => {
      const PanelComponent = panels[activeTabId]
      return <PanelComponent />
    }
  return (
    <ul className="license flex items-center flex-wrap gap-2">
        { renderPanelComponent() }
    </ul>
  )
}

export default EventdetailTabPanel