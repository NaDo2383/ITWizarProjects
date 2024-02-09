import React, { useCallback } from 'react'
import { IMobileMenuLink } from './_interface'
import { useRouter } from 'next/navigation'
import { useHeaderCtx } from '../header/useHeaderContext'
import tw from 'tailwind-styled-components'

const MobileMenuLink = (props: IMobileMenuLink) => {
    const { text, href } = props
    const { push } = useRouter()
    const { setIsOpenMobileMenu } = useHeaderCtx()

    const handleClick = useCallback(() => {
        push(href)
        setIsOpenMobileMenu(false)
    }, [href, text])

    return <AdminMobileMenuLinkTw onClick={handleClick}>{text}</AdminMobileMenuLinkTw>
}

const AdminMobileMenuLinkTw = tw.button`
    py-2
    bg-transparent
    dark:!bg-gray-600
`

export default MobileMenuLink
