import NextHead from 'common/seo/NextHead'
import { SemiSmallWrapper } from 'components/ui/containers/Wrapper'
import Form from 'components/ui/form/Form'
import ResetPasswordForm from 'features/user/form/ResetPasswordForm'

import React from 'react'

function ResetPassword() {
    return (
        <>
            <NextHead title="Sign up Metaverse assets platform" />
            <SemiSmallWrapper className="pt-220">
                <Form>
                    <ResetPasswordForm />
                </Form>
            </SemiSmallWrapper>
        </>
    )
}

export default ResetPassword
