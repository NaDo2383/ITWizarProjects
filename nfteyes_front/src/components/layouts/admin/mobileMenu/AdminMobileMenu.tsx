import React, { useRef } from 'react'
import MobileMenuLink from './AdminMobileMenuLink'
import { useHeaderCtx } from '../header/useHeaderContext'
import tw from 'tailwind-styled-components'
import CloseBtn from 'components/ui/button/CloseBtn'
import { adminMenuItems } from '../sidebar/adminMenuItems'
import Flex from 'components/ui/containers/flex/Flex'

function AdminMobileMenu(): JSX.Element {
    const { isOpenMobileMenu, setIsOpenMobileMenu } = useHeaderCtx()
    const ref = useRef(null)

    return (
        <AdminMobileMenuTw isopen={isOpenMobileMenu ? `isopen=${isOpenMobileMenu}` : ''}>
            <Flex className="justify-end pt-3 pr-9 dark:bg-gray-600 border-b border-gray-300">
                <CloseBtn onClick={() => setIsOpenMobileMenu(false)} />
            </Flex>
            <AdminMenuWrapperTw ref={ref}>
                {adminMenuItems?.length > 0 &&
                    adminMenuItems.map((item, idx) => <MobileMenuLink key={'admin-mobile-menu' + idx} {...item} />)}
            </AdminMenuWrapperTw>
        </AdminMobileMenuTw>
    )
}

interface IAdminMobileMenuTw {
    isopen: boolean | string
}
const AdminMobileMenuTw = tw.div<IAdminMobileMenuTw>`
    fixed
    top-0
    left-0
    right-0
    bottom-0
    w-screen
    h-screen
    ${(p) => (p.isopen ? 'translate-x-0' : '-translate-x-[100%]')}
    overflow-y-scroll
    overflow-x-hidden
    transition-transform
    z-100
    bg-gray-600
    lg:hidden
`

const AdminMenuWrapperTw = tw.div`
  flex
  flex-col
  w-screen
  h-screen
`

export default AdminMobileMenu
