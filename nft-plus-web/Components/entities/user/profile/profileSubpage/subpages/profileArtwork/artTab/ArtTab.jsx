/**
 * @createdBy Phill Anderson 2023/3/21
 */
import React from 'react'
import Tab from 'Components/ui/tab/Tab'
import ArtTabHeader from './ArtTabHeader'
import ArtTabPanels from './ArtTabPanels'

function ArtTab() {
  return (
    <Tab>
        <div role='profile artwork tab' aria-label='tab' className='px-5'>
            <ArtTabHeader />
            <ArtTabPanels />
        </div>
    </Tab>    
  )
}

export default ArtTab