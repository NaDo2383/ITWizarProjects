import React, { useEffect } from 'react'
import MypageTabLink from './MypageTabLink'
import { useTabCtx } from '@/components/ui/tab/store/useTabCtx'
import styled from 'styled-components';
import useTab from '@/components/ui/tab/store/useTab';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useGlobalCtx } from '@/common/global/useGlobalCtx';
const tabLinkItems = [
    {
        id: 0,
        text: '사용자 정보',
    },
    {
        id: 1,
        text: '이용권 구매 기록',
    },
    {
        id: 2,
        text: '신원인증',
    },
]
function MypageTabHeader() {
    const { query, push } = useRouter()
    const { setTabHeadItems, activeTabId } = useTabCtx()
    const { tabLinksRef } = useTab()

    const handleSearchParams = useCallback(() => {
       
        // switch (activeTabId) {
        //     case 0: push({ query: { tab: 'profile' } }); break;
        //     case 1: push({ query: { tab: 'profile' } }); break;
        //     case 2: push({ query: { tab: 'profile' } }); break;
        //     default: push({ query: { tab: 'profile' } }); break;
        // }
    },[])

    useEffect(() => {
        setTabHeadItems(tabLinkItems)
    }, [])
    return (
        <TabHeaderWrapper role="tablist">
            <TabContainer>
            <div className='col-12'>
                <TabNavigation>
                        <TabUl id="mypage-menu-ul">
                                {
                                    tabLinkItems.map((item, idx) => (
                                        <MypageTabLink 
                                            key={`${item.text}-${idx}`} 
                                            {...item}
                                            ref={(el) => (tabLinksRef.current[idx] = el)}
                                            handleSearchParams={handleSearchParams}
                                        />
                                    ))
                                }
                        </TabUl>
                </TabNavigation>
            </div>
            </TabContainer>
        </TabHeaderWrapper>
    )
}

export const TabHeaderWrapper = styled.div`
  display: flex;
  gap: 10px;
  min-width: 420px;
`;

export const TabContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: white;
`;

// TabNavigation
export const TabNavigation = styled.nav`
  display:flex;
  justify-content: space-between;
  width:100%;
  position: relative;
  margin-block: 40px;
`;

// Ul
export const TabUl = styled.ul`
  position: relative;
  list-style: none;
  padding: 0;
  text-align: center;
  font-weight: bold;
`;

export default MypageTabHeader
