import useTab from 'a/components/ui/tab/store/useTab'
import { useTabCtx } from 'a/components/ui/tab/store/useTabCtx'
import React, { forwardRef } from 'react'
import tw from 'tailwind-styled-components'

const StepperTabHeaderLink = forwardRef((props, ref) => {
    const { id, text } = props
    const { activeTabId, tabHeadItems } = useTabCtx()
    const isActive = activeTabId === id
    const { handleKeyDown } = useTab()

    return (
        <StepperLinkBtn
            aria-selected={isActive}
            role="tab"
            ref={ref}
            tabIndex={isActive ? 0 : -1}
            onClick={() => {}}
            className={isActive ? 'bg-accent text-white' : ''}
            onKeyDown={(e) => handleKeyDown(e, tabHeadItems)}
        >
            {text}
        </StepperLinkBtn>
    )
})

const StepperLinkBtn = tw.button`
    w-[40px]
    h-[40px]
    px-2
    rounded-full
    border
    border-accent
`

export default StepperTabHeaderLink
