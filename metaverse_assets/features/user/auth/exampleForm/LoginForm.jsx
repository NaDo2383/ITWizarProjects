import React from 'react'
import useJwtAuth from '../useJwtAuth'
import InputEmail from '@/components/ui/form/elements/input/InputEmail'
import useForm from '@/components/ui/form/store/useForm'
import InputPassword from '@/components/ui/form/elements/input/InputPassword'
import { Button } from '@/components/ui/button/Button'
import styled from 'styled-components'
import { MdOutlineMailOutline } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
const initialLoginFormState = {
    email: { value: null, error: null },
    password: { value: null, error: null },
}
function LoginForm() {
    const { loginUser, isLoading } = useJwtAuth()
    const { onChange, formState } = useForm(initialLoginFormState)

    async function onSubmit(e) {
        e.preventDefault()
        const payload = {
            email: formState?.email?.value,
            password: formState?.password?.value,
        }
        const { success } = await loginUser(payload)
        if (!isLoading && success) {
            console.error('not success')
        }
    }

    return (
        <form className="flex flex-col gap-10">
            <LoginFormRow>
                <MdOutlineMailOutline />
                <InputEmail
                    name="email"
                    onChange={onChange}
                    value={formState?.email?.value}
                    isValid={Boolean(formState?.email?.error)}
                    className="bg-transparent border-none focus:ring-0"
                />
            </LoginFormRow>
            <LoginFormRow>
                <RiLockPasswordFill />
                <InputPassword
                    name="password"
                    onChange={onChange}
                    value={formState?.password?.value}
                    isValid={Boolean(formState?.password?.error)}
                    className="bg-transparent border-none focus:ring-0"
                />
            </LoginFormRow>
            <Button isLoading={isLoading} onClick={onSubmit}>
                <p className="text-blueSoft">Login</p>
            </Button>
        </form>
    )
}

const LoginFormRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding-left: 10px;
    border: 1px solid pink; /* You can adjust the border style here */
`

export default LoginForm
