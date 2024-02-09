import MainPopup from 'a/common/popup/_partials/MainPopup'
import { FormProvider } from 'a/components/ui/form/store/useFormCtx'
import React from 'react'
import AssetCheckUserForm from '../form/AssetCheckUserForm'

function AssetCheckUserPopup() {
    return (
        <MainPopup title="신원 인증">
            <FormProvider>
                <AssetCheckUserForm />
            </FormProvider>
        </MainPopup>
    )
}

export default AssetCheckUserPopup
