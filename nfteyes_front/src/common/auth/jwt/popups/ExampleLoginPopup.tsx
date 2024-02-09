import React from 'react'
import { FormProvider } from 'components/ui/form/store/useFormCtx'
import LoginForm from '../forms/ExampleLoginForm'
import GlobalMainPopup from 'common/popup/_partials/GlobalMainPopup'

function LoginPopup() {
    return (
        <GlobalMainPopup title="login">
            <FormProvider>
                <LoginForm />
            </FormProvider>
        </GlobalMainPopup>
    )
}

export default LoginPopup
