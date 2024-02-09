import Tab from '@/components/ui/tab/Tab'
import React from 'react'
import RegStatusTabHeader from './RegStatusTabHeader'
import RegStatusTabPanels from './RegStatusTabPanels'

function RegStatusTab() {
  return (
    <Tab>
        <div className='d-flex flex-column w-100'>
            <RegStatusTabHeader />
            <RegStatusTabPanels />
        </div>
    </Tab>
  )
}

export default RegStatusTab