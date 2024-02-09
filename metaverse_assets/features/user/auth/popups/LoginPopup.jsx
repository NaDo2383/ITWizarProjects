import MainPopup from '@/common/popup/_partials/MainPopup'
import React from 'react'
import { FormProvider } from '@/components/ui/form/store/useFormCtx'
import LoginForm from '../exampleForm/LoginForm'

function LoginPopup() {
    return (
        <MainPopup title="login">
            <FormProvider>
                <LoginForm />
            </FormProvider>
        </MainPopup>
    )
}

export default LoginPopup
