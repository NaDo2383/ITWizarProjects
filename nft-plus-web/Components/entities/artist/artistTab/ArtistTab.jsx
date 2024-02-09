import { TabProvider } from 'Components/ui/tab/useTabContext'
import React from 'react'
import ArtistTabHeader from './ArtistTabHeader'
import ArtistTabPanels from './ArtistTabPanels'

function ArtistTab() {
  
  return (
    <TabProvider>
        <div className='flex-col w-full justify-center'>
                <ArtistTabHeader />
                <ArtistTabPanels />
        </div>
    </TabProvider>
  )
}

export default ArtistTab