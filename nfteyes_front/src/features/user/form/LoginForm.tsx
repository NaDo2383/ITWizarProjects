import React, { useState } from 'react'
import InputPassword from 'components/ui/form/elements/input/InputPassword'
import useForm from 'components/ui/form/store/useForm'
import { validateForm } from 'common/validation/validate'
import { loginFormSchema } from './loginFormSchema'
// import { useMetamaskCtx } from 'common/metamask/useMetamaskCtx'
import { useRouter } from 'next/navigation'
// import useUser from '../useUser'
import useJwtAuth from 'common/auth/jwt/useJwtAuth'
import InputText from 'components/ui/form/elements/input/InputText'
// import { useSiteGlobalCtx } from 'common/global/useSiteGlobalCtx'
// import { useGlobalPopupCtx } from 'common/popup/globalPopups/useGlobalPopupCtx'
// import { GLOBAL_POPUP_TYPES } from 'common/popup/globalPopups/globalPopupRegistration'
// import { setTokenIntoCookie } from 'common/token/token'
// import { useUserCtx } from '../useUserCtx'
// import { Local } from 'libs/constants'
import FormRow from 'components/ui/form/FormRow'
import { Button } from 'components/ui/button/Button'
// import { setLocal } from 'common/storage/localStorage'
import Link from 'next/link'

const initialLoginState = {
    id: { value: null, error: null },
    password: { value: null, error: null },
}

function LoginForm() {
    const { push } = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const { onChange, onError, formState } = useForm(initialLoginState)
    const { loginUser } = useJwtAuth()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)
        try {
            const loginData: any = {
                username: formState.id.value,
                password: formState.password.value,
            }

            const { success, errors } = await validateForm(loginFormSchema, formState)
            if (!success) {
                onError(errors)
                console.error('validation амжилтгүй', errors)
                return
            }
            const result = await loginUser(loginData)
            if (result?.success) {
                push('/')
            } else if (result?.errorCode === 400) {
                if (result?.message === 'username.not.exist') {
                    onError({
                        id: "Couldn't find your Account",
                        password: "Wrong password. Try again or click 'Find my password' button to reset it",
                    })
                } else {
                    onError({
                        password: "Wrong password. Try again or click 'Find my password' button to reset it",
                    })
                }
            }
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <form className={`flex flex-col gap-10 ${isLoading ? 'pointer-events-none' : 'pointer-events-auto'}`}>
            <div>
                <FormRow errMsg={formState?.id?.error}>
                    <InputText
                        name={'id'}
                        onChange={onChange}
                        value={formState?.id?.value!}
                        isValid={Boolean(formState?.id?.error)}
                        placeholder="ID (E-mail)"
                        className="bg-[#2D2B3A]"
                    />
                </FormRow>
                <FormRow errMsg={formState?.password?.error}>
                    <InputPassword
                        name={'password'}
                        onChange={onChange}
                        value={formState?.password?.value!}
                        isValid={Boolean(formState?.password?.error)}
                        placeholder="PW"
                        className="bg-[#2D2B3A]"
                    />
                </FormRow>
            </div>
            <div className="w-full">
                <Button onClick={handleSubmit} isLoading={isLoading} disabled={isLoading}>
                    Login
                </Button>
            </div>
            <div className="w-full flex justify-between">
                <Link href={'/register'} className="text-20">
                    Register
                </Link>
                <Link href={'/reset-password'} className="text-20">
                    Find my password
                </Link>
            </div>
        </form>
    )
}

export default LoginForm
