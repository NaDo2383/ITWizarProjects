import React, { forwardRef } from 'react'
import { useTabCtx } from '../../store/useTabCtx'
import styled from 'styled-components'
import useTab from '../../store/useTab'

const BTabLink = forwardRef((props, ref) => {
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
            onKeyDown={(e) => handleKeyDown(e, tabHeadItems)}
        >
            {text}
        </BorderedLink>
    )
})

const BorderedLink = styled.button`
    display: inline-block;
    width: 100%;
    padding: 10px;
    text-align: center;
    border-radius: 10px 10px 0 0;
    border: 1px solid #000; /* Border color can be customized */
    ${(props) => (props.active === 'true' ? 'border-bottom: 0;' : '')}
    ${(props) => (props.first ? 'border-right: 1px solid #000;' : '')}
  &:nth-child(even) {
        border-right: 0;
        border-left: 0;
    }
    &:focus {
        outline: none;
    }
`

export default BTabLink
