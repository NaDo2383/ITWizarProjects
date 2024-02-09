import { useTabCtx } from '@/components/ui/tab/store/useTabCtx'
import React from 'react'
import MediaRegistrationStatus from './panels/mediaRegistrationStatus/MediaRegistrationStatus'
import SalesRegistrationStatus from './panels/salesRegistrationStatus/SalesRegistrationStatus'
import { TabPanelWrapper } from '@/features/user/myPage/tab/MypageTabPanels'

const regStatusTabPanels = [
    <MediaRegistrationStatus key={'xcvvopxfvj'} />,
    <SalesRegistrationStatus key={'blefkoekf'} />,
]
function RegStatusTabPanels() {
    const { activeTabId, setActiveTabId } = useTabCtx()
  return (
    <TabPanelWrapper>{regStatusTabPanels[activeTabId]}</TabPanelWrapper>
  )
}

export default RegStatusTabPanels