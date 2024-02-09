import Tab from 'Components/ui/tab/Tab'
import React from 'react'
import ArtDetailTabHeader from './ArtDetailTabHeader'
import ArtdetailTabPanel from './ArtdetailTabPanel'

function ArtDetailTab() {
  return (
    <Tab>
        <ArtDetailTabHeader />
        <ArtdetailTabPanel />
    </Tab>
  )
}

export default ArtDetailTab