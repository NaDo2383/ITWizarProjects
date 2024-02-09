import React from 'react'
import MainDrawer from '../_partials/MainDrawer'
import Flex from 'components/ui/containers/flex/Flex'
import { useRouter } from 'next/navigation'
import tw from 'tailwind-styled-components'
import { useDrawerCtx } from '../useDrawerCtx'
import { useSiteGlobalCtx } from 'common/global/useSiteGlobalCtx'

function ExampleDrawer1() {
    const { push } = useRouter()
    const { closeDrawer } = useDrawerCtx()
    const { setIsClickedHamburger } = useSiteGlobalCtx()

    function handleClose(url: string) {
        closeDrawer()
        setIsClickedHamburger(false)
        push(url)
    }

    return (
        <MainDrawer>
            <Flex className="flex-col gap-20 text-left p-10">
                <SiteMobileMenuBtn onClick={() => handleClose('/')}>INTRODUCTION</SiteMobileMenuBtn>
                <SiteMobileMenuBtn onClick={() => handleClose('/statistics')}>STATISTICS</SiteMobileMenuBtn>
                <SiteMobileMenuBtn onClick={() => handleClose('/history')}>HISTORY</SiteMobileMenuBtn>
                <SiteMobileMenuBtn onClick={() => handleClose('/my-page')}>MYPAGE</SiteMobileMenuBtn>
            </Flex>
        </MainDrawer>
    )
}

const SiteMobileMenuBtn = tw.button`
    bg-transparent
    text-gray-50
    text-left
    hover:bg-transparent
    hover:pl-20
    transition-all
`

export default ExampleDrawer1
