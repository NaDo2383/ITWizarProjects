import { SmallWrapper } from 'components/ui/containers/Wrapper'
import Form from 'components/ui/form/Form'
import SignupForm from 'features/user/form/SignupForm'
import { NextPage } from 'next'
import React from 'react'

const RegisterPage: NextPage = () => {
    return (
        <SmallWrapper className=" pt-220">
            <h1 className=" text-center">Register</h1>
            <Form>
                <SignupForm />
            </Form>
        </SmallWrapper>
    )
}

export default RegisterPage
