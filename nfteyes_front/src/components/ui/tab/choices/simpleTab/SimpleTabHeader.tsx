import React, { useEffect } from 'react'
import SimpleTabLink from './SimpleTabLink'
import { TTab, TTabLinkItem } from '../../store/_type'
import useTab from '../../store/useTab'
import { useTabCtx } from '../../store/useTabCtx'

const tabLinkItems: TTabLinkItem[] = [
    {
        id: 0,
        text: 'tab 0',
    },
    {
        id: 1,
        text: 'tab 1',
    },
    {
        id: 2,
        text: 'tab 2',
    },
]
function SimpleTabHeader(props: TTab): JSX.Element {
    const { name } = props
    const { tabLinksRef } = useTab()
    const { setTabHeadItems } = useTabCtx()

    useEffect(() => {
        setTabHeadItems(tabLinkItems)
    }, [])
    return (
        <div id={name} role="tablist" className="flex gap-10 min-w-[420px] bg-purple">
            {tabLinkItems.map((item, idx) => (
                <SimpleTabLink
                    key={'tab-' + idx}
                    {...item}
                    ref={(el: HTMLButtonElement) => (tabLinksRef.current[idx] = el)}
                />
            ))}
        </div>
    )
}

export default SimpleTabHeader
