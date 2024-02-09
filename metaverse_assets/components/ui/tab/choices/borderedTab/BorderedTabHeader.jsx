import { useEffect } from 'react'
import useTab from '../../store/useTab'
import { useTabCtx } from '../../store/useTabCtx'
import BTabLink from './BTabLink'
import styled from 'styled-components'

const bTablinkItems = [
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

function BorderedTabHeader(props) {
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
                    ref={(el) => (tabLinksRef.current[idx] = el)}
                    {...item}
                />
            ))}
        </BorderedHeader>
    )
}

const BorderedHeader = styled.div`
    display: flex;
    overflow: hidden;
`

export default BorderedTabHeader
