import React from 'react'
import styled, { css } from 'styled-components'

function Dropdown(props) {
    const { children, isShow } = props

    return <DropPanel isshow={isShow.toString()}>{children}</DropPanel>
}

const DropPanel = styled.div`
    transition: all 0.3s;
    position: absolute;
    top: 100%;
    right: 0;
    ${(props) =>
        props.isshow === 'true'
            ? css`
                  display: block;
                  opacity: 1;
                  height: auto;
              `
            : css`
                  display: none;
                  opacity: 0;
                  height: 0;
              `};
`

export default Dropdown
