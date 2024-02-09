import React from 'react'
import UguideTabHeader from './UguideTabHeader'
import UguideTabPanel from './UguideTabPanel'
import { TabProvider } from 'Components/ui/tab/useTabContext'

function UguideTab() {
  return (
    <TabProvider>
      <div className='w-full'>
        <UguideTabHeader />
        <UguideTabPanel />
      </div>  
    </TabProvider>
  )
}

export default UguideTab