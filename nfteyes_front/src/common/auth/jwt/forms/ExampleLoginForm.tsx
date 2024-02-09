import React from 'react'
import useJwtAuth from '../useJwtAuth'
import FormRow from 'components/ui/form/FormRow'
import InputEmail from 'components/ui/form/elements/input/InputEmail'
import useForm from 'components/ui/form/store/useForm'
import InputPassword from 'components/ui/form/elements/input/InputPassword'
import { TLoginUserForm } from '../_types'
import { useGlobalPopupCtx } from 'common/popup/globalPopups/useGlobalPopupCtx'
import { Button } from 'components/ui/button/Button'
import { TFormState } from 'components/ui/form/store/formReducer'

const initialLoginFormState: TFormState = {
    email: { value: null, error: null },
    password: { value: null, error: null },
}
function LoginForm() {
    const { loginUser, isLoading } = useJwtAuth()
    const { onChange, formState } = useForm<TFormState>(initialLoginFormState)
    const { hideAllGlobalPopups } = useGlobalPopupCtx()

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        const payload: TLoginUserForm = {
            email: formState?.email?.value!,
            password: formState?.password.value!,
        }
        const { success } = await loginUser(payload)
        if (!isLoading && success) {
            hideAllGlobalPopups()
        }
    }

    return (
        <form>
            <FormRow>
                <InputEmail
                    name="email"
                    onChange={onChange}
                    value={formState?.email?.value!}
                    isValid={Boolean(formState?.email?.error)}
                />
            </FormRow>
            <FormRow>
                <InputPassword
                    name="password"
                    onChange={onChange}
                    value={formState?.password?.value!}
                    isValid={Boolean(formState?.password?.error)}
                />
            </FormRow>
            <FormRow>
                <Button isLoading={isLoading} onClick={onSubmit}>
                    Login
                </Button>
            </FormRow>
        </form>
    )
}

export default LoginForm
