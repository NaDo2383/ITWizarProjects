import React, { useEffect } from 'react'
import { useTabCtx } from 'a/components/ui/tab/store/useTabCtx'
import { useRouter } from 'next/router'
import { MY_PAGE_TAB } from 'a/libs/constants'
import Profile from './panels/profile/Profile'
import LicenseHistory from './panels/licenseHistory/LicenseHistory'
import tw from 'tailwind-styled-components'

const simpleTabPanels = [<Profile key={'faefsrf'} />, <LicenseHistory key={'faefsr1'} />]

function TabPanels() {
    const router = useRouter()
    const { activeTabId, setActiveTabId } = useTabCtx()

    useEffect(() => {
        switch (router.query.tab) {
            case MY_PAGE_TAB.PROFILE:
                setActiveTabId(0)
                break
            case MY_PAGE_TAB.LICENSE_HISTORY:
                setActiveTabId(1)
                break
            default:
                setActiveTabId(0)
                break
        }
    }, [router.query])
    return <TabPanelWrapper>{simpleTabPanels[activeTabId]}</TabPanelWrapper>
}
const TabPanelWrapper = tw.div`
  p-[10px]
  overflow-hidden
`

export default TabPanels
