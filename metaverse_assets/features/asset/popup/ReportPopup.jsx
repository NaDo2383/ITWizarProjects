import MainPopup from 'a/common/popup/_partials/MainPopup'
import { FormProvider } from 'a/components/ui/form/store/useFormCtx'
import React from 'react'
import ReportForm from '../form/ReportForm'

export default function ReportPopup() {
    return (
        <MainPopup title="에셋 신고" minWidth={800}>
            <FormProvider>
                <ReportForm />
            </FormProvider>
        </MainPopup>
    )
}
