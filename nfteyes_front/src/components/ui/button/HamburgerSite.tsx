/**
 * @createdBy Phill Anderson 2022/11/15
 */
import { DRAWER_TYPES, useDrawerCtx } from 'common/drawer/useDrawerCtx'
import { useSiteGlobalCtx } from 'common/global/useSiteGlobalCtx'
import React, { useCallback } from 'react'
import tw from 'tailwind-styled-components'

function HamburgerSite(): JSX.Element {
    const { isClickedHamburger, setIsClickedHamburger } = useSiteGlobalCtx()
    const { showDrawer } = useDrawerCtx()

    const handleClick = useCallback(() => {
        setIsClickedHamburger((prev) => !prev)
        showDrawer({
            drawerType: DRAWER_TYPES.EXAMPLE1,
        })
    }, [])

    return (
        <HamburgerTw onClick={handleClick} className={isClickedHamburger ? 'open-hamburger' : ''}>
            <HamburgerPieceTw />
            <HamburgerPieceTw />
            <HamburgerPieceTw />
        </HamburgerTw>
    )
}

interface IHamburgerBtn extends Partial<TButton> {
    isClicked?: boolean
}

const HamburgerTw = tw.button<IHamburgerBtn>`
  flex 
  flex-col 
  relative 
  justify-evenly 
  items-center  
  w-[30px] 
  h-[30px] 
  p-2 
  outline-none 
  overflow-hidden 
  bg-slate-500 
  z-50 
  focus:outline-none  
  md:hidden
`

const HamburgerPieceTw = tw.div`
    relative 
    w-[14px]  h-1  
    bg-white 
    rounded 
    origin
    transition
`

export default HamburgerSite
