import React from 'react'
import Link from 'next/link'
import NavItem from './NavItem'
import { useUserCtx } from '@/features/user/useUserCtx';
function Navigation() {
    const navItems = [
        {
            text: '마켓',
            href: "/"
        },
        {
            text: '미디어 등록',
            href: "/artwork/registration-status"
        },
    ]
    const { userInfo } = useUserCtx();

    return (
        <nav id="main-nav" className="main-nav">
            <ul id="menu-primary-menu" className="menu">
                {
                    userInfo && userInfo?.membership_type === "content-provider" ? (
                        navItems.map((menu, idx) => (
                            <NavItem key={'nav-' + idx} {...menu} />
                        ))
                    ) : (
                        navItems.map((menu, idx) => (
                            menu.text !== '미디어 등록' &&
                            <NavItem key={'nav-' + idx} {...menu} />
                        ))
                    )
                }
            </ul>
        </nav>
    )
}

export default Navigation