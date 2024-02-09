import React from 'react'
import { HeaderProvider } from './useHeaderContext'
import AdminHeaderUi from './AdminHeaderUi'

function AdminHeader() {
    return (
        <HeaderProvider>
            <AdminHeaderUi />
        </HeaderProvider>
    )
}

export default AdminHeader
