import { useEffect } from 'react'
import { TTab, TTabLinkItem } from '../../store/_type'
import useTab from '../../store/useTab'
import { useTabCtx } from '../../store/useTabCtx'
import BTabLink from './BTabLink'
import tw from 'tailwind-styled-components'
const bTablinkItems: TTabLinkItem[] = [
    {
        id: 0,
        text: 'гарчиг 1',
    },
    {
        id: 1,
        text: 'гарчиг 2',
    },
    {
        id: 2,
        text: 'гарчиг 3',
    },
]

function BorderedTabHeader(props: TTab): JSX.Element {
    const { name } = props
    const { tabLinksRef } = useTab()
    const { setTabHeadItems } = useTabCtx()
    useEffect(() => {
        setTabHeadItems(bTablinkItems)
    }, [])
    return (
        <BorderedHeader role="tablist" id={name}>
            {bTablinkItems.map((item, idx) => (
                <BTabLink
                    key={'btab-' + idx}
                    ref={(el: HTMLButtonElement) => (tabLinksRef.current[idx] = el)}
                    {...item}
                />
            ))}
        </BorderedHeader>
    )
}

const BorderedHeader = tw.div`
    flex
    overflow-hidden
`

export default BorderedTabHeader
