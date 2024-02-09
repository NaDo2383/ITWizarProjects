import React, { forwardRef } from 'react'
import { useCallback } from 'react'
import useTab from 'a/components/ui/tab/store/useTab'
import tw from 'tailwind-styled-components'
import { useTabCtx } from 'a/components/ui/tab/store/useTabCtx'

const TabLink = forwardRef((props, ref) => {
    const { id, text, handleSearchParams } = props
    const { setActiveTabId, activeTabId, tabHeadItems } = useTabCtx()
    const isActive = activeTabId === id
    const { handleKeyDown } = useTab()

    const handleLink = useCallback(() => {
        setActiveTabId(id)
        handleSearchParams()
    }, [])

    return (
        <div>
            <TabLi
                aria-selected={isActive}
                role="tab"
                ref={ref}
                tabIndex={isActive ? 0 : -1}
                onClick={handleLink}
                className={isActive ? 'text-accent dark:text-accent font-bold' : ''}
                onKeyDown={(e) => handleKeyDown(e, tabHeadItems)}
            >
                {text}
            </TabLi>
        </div>
    )
})

const TabLi = tw.li`
    text-black
    dark:text-white
    text-[16px]
    rounded-0
    bg-[#161616]
    py-8
    cursor-pointer
    mr-[20px]
    pb-[5px]
    last:mr-0
`

export default TabLink
