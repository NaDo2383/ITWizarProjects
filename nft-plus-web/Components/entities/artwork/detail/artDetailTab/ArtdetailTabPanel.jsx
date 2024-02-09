import useTab from 'Components/ui/tab/useTab'
import React from 'react'
import DetailPanel1 from './DetailPanel1'
import DetailPanel2 from './DetailPanel2'

const panels = [ 
        <DetailPanel1 key={'dp-0'} />, 
        <DetailPanel2 key={'dp-1'} /> 
    ] 
    
function ArtdetailTabPanel() {
    const { activeTabId } = useTab()
    
  return (
    <ul className="license flex items-center flex-wrap gap-2">
        { panels[activeTabId] }
    </ul>
  )
}

export default ArtdetailTabPanel