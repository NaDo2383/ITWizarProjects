import Link from 'next/link'
import { useState } from 'react'
import Navigation from './nav/Navigation'
import MetamaskBtn from '../ui/button/MetamaskBtn'
import NavItem from './nav/NavItem'
export default function MobileMenu() {
    const [isActive, setIsActive] = useState({
        status: false,
        key: "",
    })

    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            })
        } else {
            setIsActive({
                status: true,
                key,
            })
        }
    }

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

    return (
        <>
            <nav id="mobile-main-nav" className="mobile-main-nav">
                <ul id="menu-mobile-menu" className="menu">
                    {
                        navItems.map((menu, idx) => (
                            <NavItem key={'nav-' + idx} {...menu} />
                        ))
                    }
                </ul>
            </nav>
        </>
    )
}
