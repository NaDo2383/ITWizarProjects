import React, { forwardRef } from 'react'
import useTab from '@/components/ui/tab/store/useTab'
import { useTabCtx } from '@/components/ui/tab/store/useTabCtx'
import styled from 'styled-components'
import { useCallback } from 'react'
const MypageTabLink = forwardRef((props, ref) => {
    const { id, text, handleSearchParams } = props
    const { setActiveTabId, activeTabId, tabHeadItems } = useTabCtx()
    const isActive = activeTabId === id
    const { handleKeyDown } = useTab()
    
    const handleLink = useCallback(() => {
        setActiveTabId(id)
        handleSearchParams()
    },[])
    return (
        <TabLink
            aria-selected={isActive}
            role="tab"
            ref={ref}
            tabIndex={isActive ? 0 : -1}
            onClick={handleLink}
            className={isActive ? 'tab-active' : ''}
            onKeyDown={(e) => handleKeyDown(e, tabHeadItems)}
        >
            {text}
        </TabLink>
    )
})

export const TabLink = styled.a`
    color: #fff;
    font-size: 16px;
    border-radius: 0;
    background-color: #161616;
    cursor:pointer;
    margin-right: 20px;
    padding-bottom: 5px;
    &:last-child {
        margin-right: 0;
    }
`

export default MypageTabLink
