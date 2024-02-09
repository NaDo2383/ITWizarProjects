import useTab from 'a/components/ui/tab/store/useTab'
import { useTabCtx } from 'a/components/ui/tab/store/useTabCtx'
import React, { useEffect } from 'react'
import StepperTabHeaderLink from './StepperTabHeaderLink'
import tw from 'tailwind-styled-components'
const tabLinkItems = [
    {
        id: 0,
        text: '1',
    },
    {
        id: 1,
        text: '2',
    },
    {
        id: 2,
        text: '3',
    },
]

function StepperTabHeader() {
    const { tabLinksRef } = useTab()
    const { setTabHeadItems } = useTabCtx()
    useEffect(() => {
        setTabHeadItems(tabLinkItems)
    }, [])
    return (
        <StepperTabHeaderTw role="tablist">
            {tabLinkItems.map((item, idx) => (
                <StepperTabHeaderLink
                    key={'tab-' + idx}
                    {...item}
                    ref={(el) => (tabLinksRef.current[idx] = el)}
                />
            ))}
        </StepperTabHeaderTw>
    )
}

const StepperTabHeaderTw = tw.div`
    flex 
    gap-10
    justify-center 
    w-full
    mt-10
    mb-10
`

export default StepperTabHeader
