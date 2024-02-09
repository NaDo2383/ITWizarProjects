import React, { useRef } from 'react'
import tw from 'tailwind-styled-components'
import { Wrapper } from 'components/ui/containers/Wrapper'
import { useAdminGlobalCtx } from 'common/global/useAdminGlobalCtx'
function AdminFooter(): JSX.Element {
    const ref = useRef(null)
    const { adminGlobalItems } = useAdminGlobalCtx()
    const adminHeaderHeight = adminGlobalItems?.adminHeader?.offsets?.offsetHeight

    // console.log('adminHeaderHeight', adminHeaderHeight)

    return (
        <AdminFooterTw ref={ref} style={{ marginTop: `-${(adminHeaderHeight - 1) * 2}px` }}>
            <Wrapper>
                <p className="text-center">Footer</p>
            </Wrapper>
        </AdminFooterTw>
    )
}

const AdminFooterTw = tw.footer`
    flex-shrink-0
    px-4 
    py-2
    border-t
    border-gray-300
    z-50
`

export default AdminFooter
