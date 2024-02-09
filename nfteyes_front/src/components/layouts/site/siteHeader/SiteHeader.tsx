import React from 'react'
import SiteNavbar from '../siteNavbar/SiteNavbar'
import Image from 'next/image'
import logo from '../../../../../public/images/icons/logo.svg'
import Link from 'next/link'
import Flex from 'components/ui/containers/flex/Flex'
import HamburgerSite from 'components/ui/button/HamburgerSite'

function SiteHeader() {
    return (
        <header className="bg-blackSoft">
            <Flex className="h-[80px] items-center justify-between px-80">
                <Link href={'/'} className="mt-[23px] mb-[17px]">
                    <Image src={logo} alt="" width={163} height={64} />
                </Link>
                <SiteNavbar />
                <HamburgerSite />
            </Flex>
        </header>
    )
}

export default SiteHeader
