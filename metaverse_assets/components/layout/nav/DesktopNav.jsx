import React, { useRef } from 'react'
import LogoIcon from 'a/components/ui/icon/LogoIcon'
import tw from 'tailwind-styled-components'
import NavItem from './NavItem'
import WalletButton from 'a/components/ui/button/WalletButton'
import ProfileBtn from 'a/components/ui/button/ProfileBtn'
// import DarkMode from 'a/components/ui/mode/DarkMode'
import useElementPosition from 'a/common/window/useElementPosition'
import { useGlobalCtx } from 'a/common/global/useGlobalCtx'
import MobileSideNav from './MobileSideNav'
import Button from 'a/components/ui/button/Button'
import { useRouter } from 'next/navigation'
function DesktopNav() {
    const navItems = [
        {
            text: '에셋 등록',
            href: '/asset/create',
        },
    ]
    const { push } = useRouter()
    const headerRef = useRef(null)
    useElementPosition(headerRef, { globalName: 'header' })
    const { authState } = useGlobalCtx()
    const theNavItems = authState
        ? navItems
        : navItems.filter((item) => item.href !== '/asset/create')

    return (
        <DesktopNavigation ref={headerRef}>
            <NavWrapper>
                <LogoIcon />
                <NavContent>
                    <nav className="navbar w-full">
                        <ul className="flex flex-col lg:flex-row">
                            {theNavItems.map((menu, idx) => (
                                <NavItem key={'main-menu-' + idx} {...menu} />
                            ))}
                        </ul>
                    </nav>

                    <div className="hidden items-center lg:flex lg:gap-2">
                        <WalletButton />
                        {authState ? (
                            <ProfileBtn />
                        ) : (
                            <Button onClick={() => push('/login')}>
                                <h5>로그인</h5>
                            </Button>
                        )}
                        {/* <DarkMode /> */}
                    </div>
                </NavContent>
                <MobileSideNav />
            </NavWrapper>
        </DesktopNavigation>
    )
}

const DesktopNavigation = tw.header`
    js-page-header 
    fixed 
    top-0 
    z-20 
    w-full 
    backdrop-blur 
    transition-colors
    border-b 
    border-accent-dark
`
const NavWrapper = tw.div`
    flex 
    items-center 
    px-6 
    py-6 
    xl:px-24
`

const NavContent = tw.div`
    js-mobile-menu 
    dark:bg-jacarta-800 
    invisible 
    fixed 
    inset-0 
    z-10 
    ml-auto 
    items-center 
    bg-white 
    opacity-0 
    lg:visible 
    lg:relative 
    lg:inset-auto 
    lg:flex 
    lg:bg-transparent 
    lg:opacity-100 
    dark:lg:bg-transparent
`

export default DesktopNav
