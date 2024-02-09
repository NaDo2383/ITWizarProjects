import Link from 'next/link'
import React from 'react'

function OutlineLink({ children, href }) {
  return (
    <Link className='login-other-item' href={href && href }>
        <span>{ children }</span>
    </Link>
  )
}

export default OutlineLink