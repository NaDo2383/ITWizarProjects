import React from 'react';

//internal import
import { UsersProvider } from './useUsersCtx';
import { PopupProvider } from '@/common/popup/usePopupCtx';
import CustomerPage from './CustomerPage';

function UsersPage() {
    return (
        <UsersProvider>
            <PopupProvider>
                <CustomerPage />
            </PopupProvider>
        </UsersProvider>
    );
}

export default UsersPage;
