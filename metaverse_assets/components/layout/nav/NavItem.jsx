import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import tw from 'tailwind-styled-components'
function NavItem({ text, href }) {
    const { push } = useRouter()
    const pathname = usePathname()
    const isActiveMenu = pathname === href

    return (
        <NavLi className={isActiveMenu ? 'active' : ''}>
            <NavItemBtn onClick={() => push(href)}>
                <span className="text-accent  dark:text-accent">{text}</span>
            </NavItemBtn>
        </NavLi>
    )
}
const NavLi = tw.li`
    js-nav-dropdown 
    group 
    relative
`

const NavItemBtn = tw.button`
    dropdown-toggle 
    text-jacarta-700 
    font-bold
    hover:text-accent 
    focus:text-accent 
    dark:hover:text-accent 
    dark:focus:text-accent 
    flex 
    items-center 
    justify-between 
    py-3.5 
    text-base 
    dark:text-white 
    lg:px-5 
    w-full
`

export default NavItem
