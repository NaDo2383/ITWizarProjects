import React, { forwardRef } from 'react'
import { useTabCtx } from '../../store/useTabCtx'
import { TTabLinkItem } from '../../store/_type'
import tw from 'tailwind-styled-components'
import useTab from '../../store/useTab'

const BTabLink = forwardRef<HTMLButtonElement, TTabLinkItem>((props, ref) => {
    const { id, text } = props
    const { setActiveTabId, activeTabId, tabHeadItems } = useTabCtx()
    const isActive = activeTabId === id
    const { handleKeyDown } = useTab()

    return (
        <BorderedLink
            ref={ref}
            aria-selected={isActive}
            role="tab"
            tabIndex={isActive ? 0 : -1}
            onClick={() => setActiveTabId(id)}
            className={isActive ? 'active' : ''}
            active={isActive.toString()}
            onKeyDown={(e: any) => handleKeyDown(e, tabHeadItems)}
        >
            {text}
        </BorderedLink>
    )
})

const BorderedLink = tw.button<{ active: string }>`
    inline-block
    w-full
    p-10
    text-center
    rounded-none
    rounded-tl-[10px]
    rounded-tr-[10px]
    border
    border-gray-900
    ${(p) => (p.active === 'true' ? 'border-b-0' : '')}
    first:border-r
    even:border-r-0
    even:border-l-0
    focus:outline-none
`

export default BTabLink
