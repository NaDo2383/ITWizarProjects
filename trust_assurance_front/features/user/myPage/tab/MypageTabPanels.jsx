import React, { useEffect } from 'react'
import { useTabCtx } from '@/components/ui/tab/store/useTabCtx'
import Profile from './panels/profile/Profile'
import LicenseHistory from './panels/licenseHistory/LicenseHistory'
import IdentityAuthentication from './panels/identityAuthentication/IdentityAuthentication'
import styled from 'styled-components';
import { useRouter } from 'next/router'
import { MY_PAGE_TAB } from '@/libs/constants'

const simpleTabPanels = [
    <Profile key={'faefsrf'} />,
    <LicenseHistory key={'faefsr1'} />,
    <IdentityAuthentication key={'faefsras'} />,
]
function MypageTabPanels() {
  
    const router = useRouter()
    const { activeTabId, setActiveTabId } = useTabCtx()


    useEffect(() => {
       switch(router.query.tab) {
         case MY_PAGE_TAB.PROFILE: setActiveTabId(0); break;
         case MY_PAGE_TAB.LICENSE_HISTORY: setActiveTabId(1); break;
         case MY_PAGE_TAB.IDENTITY_AUTH: setActiveTabId(2); break;
         default: setActiveTabId(0); break;
        }
    },[router.query])
    return <TabPanelWrapper>{ simpleTabPanels[activeTabId] }</TabPanelWrapper>
}
export const TabPanelWrapper = styled.div`
  padding-block: 10px;
  overflow: hidden;
`;
export default MypageTabPanels
