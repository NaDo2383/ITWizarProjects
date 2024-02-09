import React from 'react'
import Link from 'next/link'
import { useGlobalCtx } from '@/common/global/useGlobalCtx'
import MobileMenu from "../MobileMenu"
import LogoIcon from '@/components/ui/icon/LogoIcon'
import { Flex } from '@/components/ui/containers/flex/Flex'
import CloseBtn from '@/components/ui/button/CloseBtn'

function MobileNav({isMobileMenu, handleMobileMenu}) {
    const {} = useGlobalCtx()
  return (
    <div className={`mobile-nav-wrap ${isMobileMenu ? "active" : ""}`}>
                    <div className="overlay-mobile-nav" onClick={handleMobileMenu} />
                    <div className="inner-mobile-nav">
                        <Flex>
                            <LogoIcon />
                            <CloseBtn onClick={handleMobileMenu} />
                        </Flex>
                        <MobileMenu/>
                    </div>
                </div>
  )
}

export default MobileNav