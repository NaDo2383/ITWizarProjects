import React from 'react'
import MainPopup from 'a/common/popup/_partials/MainPopup'
import { FormProvider } from 'a/components/ui/form/store/useFormCtx'
import FormRow from 'a/components/ui/form/FormRow'
import LicenseAgreementForm from './LicenseAgreementForm'

function LicenseAgreementPopup() {
    return (
        <MainPopup minWidth={600} title={'라이선스 계약'}>
            <FormProvider>
                <FormRow>
                    <LicenseAgreementForm />
                </FormRow>
            </FormProvider>
        </MainPopup>
    )
}

export default LicenseAgreementPopup
