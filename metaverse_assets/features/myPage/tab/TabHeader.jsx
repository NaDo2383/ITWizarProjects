import React, { useEffect } from 'react'
import { useTabCtx } from 'a/components/ui/tab/store/useTabCtx'
import useTab from 'a/components/ui/tab/store/useTab'
import { useCallback } from 'react'
import tw from 'tailwind-styled-components'
import TabLink from './TabLink'
import { useSearchParams } from 'next/navigation'

const tabLinkItems = [
    {
        id: 0,
        text: '회원 정보',
    },
    {
        id: 1,
        text: '라이선스 계약 기록',
    },
]

function TabHeader() {
    const { setTabHeadItems, setActiveTabId } = useTabCtx()
    const { tabLinksRef } = useTab()
    const searchParams = useSearchParams()
    const activeId = searchParams.get('activeTabId')

    const handleSearchParams = useCallback(() => {
        // switch (activeTabId) {
        //     case 0: push({ query: { tab: 'profile' } }); break;
        //     case 1: push({ query: { tab: 'profile' } }); break;
        //     case 2: push({ query: { tab: 'profile' } }); break;
        //     default: push({ query: { tab: 'profile' } }); break;
        // }
    }, [])

    useEffect(() => {
        setTabHeadItems(tabLinkItems)
    }, [])

    useEffect(() => {
        const pushingTab = setTimeout(() => {
            if (activeId) {
                setActiveTabId(activeId)
            }
        }, 100)
        return () => clearTimeout(pushingTab)
    }, [activeId])

    return (
        <TabHeaderWrapper role="tablist">
            <TabContainer>
                <TabNavigation>
                    <TabUl id="mypage-menu-ul">
                        {tabLinkItems.map((item, idx) => (
                            <TabLink
                                key={`${item.text}-${idx}`}
                                {...item}
                                ref={(el) => (tabLinksRef.current[idx] = el)}
                                handleSearchParams={handleSearchParams}
                            />
                        ))}
                    </TabUl>
                </TabNavigation>
            </TabContainer>
        </TabHeaderWrapper>
    )
}

const TabHeaderWrapper = tw.div`
    flex
    gap-[10px]
    min-w-[420px]
`

const TabContainer = tw.div`
    flex
    w-full
    items-center
    text-white
    container
    mx-auto
`

const TabNavigation = tw.div`
    flex
    space-between
    w-full
    relative
`

const TabUl = tw.ul`
    flex
    flex-row   
    relative
    list-none
    p-0
    text-center
    font-bold
    gap-[20px]
`

export default TabHeader
