import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
function LogoIcon() {
  return (
    <Logo href="/">
      <span>미디어 마켓플레이스</span>
    </Logo>
  )
}

const Logo = styled(Link)`
    color: #DDF247;
    font-size: 20px;
    font-weight: bold;
    & span {
      color: #fff;
    }
`;

export default LogoIcon