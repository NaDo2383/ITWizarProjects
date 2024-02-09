import React, { forwardRef } from 'react'
import { useTabCtx } from '../../store/useTabCtx'
import { TTabLinkItem } from '../../store/_type'
import useTab from '../../store/useTab'

const SimpleTabLink = forwardRef<HTMLButtonElement, TTabLinkItem>((props: TTabLinkItem, ref) => {
    const { id, text } = props
    const { setActiveTabId, activeTabId, tabHeadItems } = useTabCtx()
    const isActive = activeTabId === id
    const { handleKeyDown } = useTab()
    return (
        <button
            aria-selected={isActive}
            role="tab"
            ref={ref}
            tabIndex={isActive ? 0 : -1}
            onClick={() => setActiveTabId(id)}
            className={isActive ? 'active' : ''}
            onKeyDown={(e: any) => handleKeyDown(e, tabHeadItems)}
        >
            {text}
        </button>
    )
})

export default SimpleTabLink
