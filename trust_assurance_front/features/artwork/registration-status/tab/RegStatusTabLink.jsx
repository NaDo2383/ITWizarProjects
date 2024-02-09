import { TabLink } from '@/features/user/myPage/tab/MypageTabLink'
import useTab from '@/components/ui/tab/store/useTab'
import { useTabCtx } from '@/components/ui/tab/store/useTabCtx'
import { useCallback } from 'react'
import { forwardRef } from 'react'

const RegStatusTabLink = forwardRef((props, ref) => {
    const { id, text } = props
    const { setActiveTabId, activeTabId, tabHeadItems } = useTabCtx()
    const isActive = activeTabId === id
    const { handleKeyDown } = useTab()
    
    const handleLink = useCallback(() => {
        setActiveTabId(id)
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

export default RegStatusTabLink