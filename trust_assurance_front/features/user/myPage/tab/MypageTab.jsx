import React from 'react'
import MypageTabHeader from './MypageTabHeader'
import MypageTabPanels from './MypageTabPanels'
import Tab from '@/components/ui/tab/Tab'

function MypageTab() {
    return (
        <Tab>
            <div className='d-flex flex-column w-100'>
                <div>
                    <MypageTabHeader />
                    <MypageTabPanels />
                </div>
            </div>
        </Tab>
    )
}

export default MypageTab
