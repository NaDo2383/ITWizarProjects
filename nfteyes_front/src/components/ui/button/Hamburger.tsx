/**
 * @createdBy Phill Anderson 2022/11/15
 */
import React, { useEffect, useState, useCallback } from 'react'
import tw from 'tailwind-styled-components'
import { useHeaderCtx } from 'components/layouts/admin/header/useHeaderContext'

function Hamburger(): JSX.Element {
    const [isClicked, setIsClicked] = useState<boolean>(false)
    const { isOpenMobileMenu, setIsOpenMobileMenu } = useHeaderCtx()

    const handleClick = useCallback(() => {
        setIsClicked((prev) => !prev)
        setIsOpenMobileMenu((prev) => !prev)
    }, [])

    useEffect(() => {
        if (!isOpenMobileMenu) {
            setIsClicked(false)
        }
    }, [isOpenMobileMenu])

    return (
        <HamburgerTw onClick={handleClick} className={isClicked ? 'open-hamburger' : ''}>
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
  lg:hidden
`

const HamburgerPieceTw = tw.div`
    relative 
    w-[14px]  h-1  
    bg-white 
    rounded 
    origin
    transition
`

export default Hamburger
