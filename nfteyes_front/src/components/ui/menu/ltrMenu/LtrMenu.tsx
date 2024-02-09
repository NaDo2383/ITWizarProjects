import React, { useRef } from 'react'
import tw from 'tailwind-styled-components'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import Flex from '../../containers/flex/Flex'
import IconBtn from '../../button/IconBtn'
import useElementPosition from 'common/window/useElementPosition'
import { useAdminGlobalCtx } from 'common/global/useAdminGlobalCtx'
import useScrollPosition, { scrollLeft } from 'common/scroll/useScrollPosition'
import LtrLink from './LtrLink'

const ltrItems = [
    {
        text: 'menu 1',
    },
    {
        text: 'menu 2',
    },
    {
        text: 'menu 3',
    },
    {
        text: 'menu 4',
    },
    {
        text: 'menu 5',
    },
    {
        text: 'menu 6',
    },
    {
        text: 'menu 7',
    },
    {
        text: 'menu 8',
    },
    {
        text: 'menu 9',
    },
    {
        text: 'menu 10',
    },
    {
        text: 'menu 11',
    },
    {
        text: 'menu 12',
    },
]

function LtrMenu() {
    const menuRef = useRef<HTMLDivElement>(null)
    const { adminGlobalItems } = useAdminGlobalCtx()
    useElementPosition(menuRef, { globalName: 'ltrMenu', isAdminSide: true })
    const scroll = useScrollPosition(menuRef)

    function handleLeft() {
        // const menuLeft = adminGlobalItems.ltrMenu.clientRect.left;
        if (menuRef.current) {
            // const menuWidth = menuRef?.current?.offsetWidth
            const menuScrollLeft = menuRef.current?.scrollLeft
            if (menuScrollLeft === 0) {
                return
            }
            const toRight = menuScrollLeft - 100
            scrollLeft(menuRef, toRight)
        }
    }
    function handleRight() {
        // const menuLeft = adminGlobalItems.ltrMenu.clientRect.left;
        if (menuRef.current) {
            // const menuWidth = menuRef?.current?.offsetWidth
            const menuScrollLeft = menuRef.current?.scrollLeft
            const totalScrollWidth = scroll.scrollWidth
            if (menuScrollLeft === totalScrollWidth) {
                return
            }
            const toRight = menuScrollLeft + 100
            scrollLeft(menuRef, toRight)
        }
    }

    function handleLink(e: React.MouseEvent<HTMLButtonElement>) {
        const menuLeft = adminGlobalItems.ltrMenu.clientRect.left
        const linkLeft = e.currentTarget.getBoundingClientRect().left
        const thisLinkWidth = e.currentTarget.getBoundingClientRect().width
        const thisLinkLeft = linkLeft - menuLeft

        if (menuRef.current) {
            const menuWidth = menuRef?.current?.offsetWidth
            const menuScrollLeft = menuRef.current?.scrollLeft

            if (menuWidth / 2 < thisLinkLeft) {
                const intoRight = menuScrollLeft + thisLinkWidth
                scrollLeft(menuRef, intoRight)
            }
            if (menuWidth / 2 > thisLinkLeft + thisLinkWidth) {
                const intoLeft = menuScrollLeft - thisLinkWidth
                scrollLeft(menuRef, intoLeft)
            }
            // console.log('харагдаж байгаа өргөн:', menuWidth)
            // console.log('menu children:', menuRef.current.children)
        }
    }

    return (
        <Flex>
            <IconBtn onClick={handleLeft}>
                <BsChevronLeft />
            </IconBtn>
            <LtrContainer ref={menuRef} id="ltr-menu">
                {ltrItems.map((item, idx) => (
                    <LtrLink key={idx} {...item} onClick={handleLink} />
                ))}
            </LtrContainer>
            <IconBtn onClick={handleRight}>
                <BsChevronRight />
            </IconBtn>
        </Flex>
    )
}

const LtrContainer = tw.div`
    flex
    gap-[10px]
    w-[500px]
    text-white
    p-10
    overflow-auto
    scrollbar-hide
`

export default LtrMenu
