import NextHead from 'common/seo/NextHead'
import RecoverPasswordForm from 'features/user/form/RecoverPasswordForm'
import { PopupProvider } from 'common/popup/usePopupCtx'
import React from 'react'
import Form from 'components/ui/form/Form'
import { SmallWrapper } from 'components/ui/containers/Wrapper'

function RecoverPage() {
    return (
        <PopupProvider>
            <NextHead title="Sign up Metaverse assets platform" />
            <SmallWrapper className="pt-137">
                <h1 className="text-center">Reset your password</h1>
                <p className="text-24 leading-35 text-center pb-30">Please enter a new password below.</p>
                <Form>
                    <RecoverPasswordForm />
                </Form>
            </SmallWrapper>
        </PopupProvider>
    )
}

export default RecoverPage
