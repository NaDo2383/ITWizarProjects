import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
function NavItem({ text, href }) {
    const router = useRouter()
    const isActiveMenu = router.asPath === href
  return (
    <li className={`menu-item ${ isActiveMenu ?  'current-menu-item': '' }`}>
        <Link href={href}>{text}</Link>
    </li>
  )
}

export default NavItem