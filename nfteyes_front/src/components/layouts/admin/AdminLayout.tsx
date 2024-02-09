import React from 'react'
import { ILayout } from './_interface'
import Footer from './footer/AdminFooter'
import AdminSidebar from './sidebar/AdminSidebar'
import AdminMain from './main/AdminMain'
import NextHead from 'common/seo/NextHead'
import tw from 'tailwind-styled-components'
import AdminHeader from './header/AdminHeader'
import Flex from 'components/ui/containers/flex/Flex'
function AdminLayout(props: ILayout): JSX.Element {
    const { children } = props

    return (
        <>
            <NextHead
                title={'admin dashboard'}
                meta={{
                    name: 'this is admin dashboard',
                    content: 'this is meta content',
                }}
            />
            <AdminLayoutTw>
                <AdminHeader />
                <Flex className="relative">
                    <AdminSidebar />
                    <AdminMain>{children}</AdminMain>
                </Flex>
                <Footer />
            </AdminLayoutTw>
        </>
    )
}

const AdminLayoutTw = tw.div`
  flex 
  flex-col
  w-full
  md:min-h-screen
  relative
`

export default AdminLayout
