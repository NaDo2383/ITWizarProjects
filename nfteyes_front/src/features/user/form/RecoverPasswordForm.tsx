import { useGlobalPopupCtx } from 'common/popup/globalPopups/useGlobalPopupCtx'
import { Button } from 'components/ui/button/Button'
import FormRow from 'components/ui/form/FormRow'
import InputPassword from 'components/ui/form/elements/input/InputPassword'
import useForm from 'components/ui/form/store/useForm'
import { Label, PinkParagraph } from 'components/ui/typography/typography-utils'
import React, { useState } from 'react'
import useJwtAuth from 'common/auth/jwt/useJwtAuth'
import { GLOBAL_POPUP_TYPES } from 'common/popup/globalPopups/globalPopupRegistration'
import { validateForm } from 'common/validation/validate'
import { recoverPasswordFormSchema } from './recoverPasswordSchema'
import { useRouter } from 'next/router'

const initialFormState = {
    password: { value: null, error: null },
    repeatPassword: { value: null, error: null },
}

function RecoverPasswordForm() {
    const { push } = useRouter()
    const { showGlobalPopup } = useGlobalPopupCtx()
    const [isOnSubmitBtnLoading, setIsOnSubmitBtnLoading] = useState(false)
    const { onChange, formState, resetFormField, setErrorField, onError } = useForm(initialFormState)
    const { changePassword } = useJwtAuth()
    const { query } = useRouter()

    async function handleSubmit(e: any) {
        e.preventDefault()
        setIsOnSubmitBtnLoading(true)
        try {
            const payload = {
                password: formState?.password?.value,
                token: query?.token,
            }

            const { success, errors } = await validateForm(recoverPasswordFormSchema, formState)

            if (!success) {
                onError(errors)
                return
            }
            if (formState?.password?.value !== formState?.repeatPassword?.value) {
                resetFormField('repeatPassword')
                setErrorField('repeatPassword', "Those password didn't match. Try again")
                return
            }

            const res: any = await changePassword(payload)
            if (res.status === 404) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: '인증번호를 다시 확인해 주세요.',
                })
                return
            }

            if (res.success) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: '비밀번호를 성공적으로 변경했습니다',
                })
                push('/login')
            }
        } catch (e) {
            console.error(e)
        } finally {
            setIsOnSubmitBtnLoading(false)
        }
    }

    return (
        <form>
            <FormRow className="gap-3 pb-10" errMsg={formState?.password?.error}>
                <Label>New password</Label>
                <InputPassword
                    name={'password'}
                    onChange={onChange}
                    value={formState?.password?.value!}
                    isValid={Boolean(formState?.password?.error)}
                />
            </FormRow>
            <FormRow className="gap-10">
                <PinkParagraph>
                    For a secure usage, please generate information excluding easily traceable details such as birthdate
                    and phone number.
                </PinkParagraph>
                <PinkParagraph>
                    You cannot use special characters other than ~!@#$%^*. Please create a password with a minimum of 8
                    characters, including English letters, numbers, and special characters.
                </PinkParagraph>
            </FormRow>
            <FormRow className="gap-3" errMsg={formState?.repeatPassword?.error}>
                <Label>Re-enter new password</Label>
                <InputPassword
                    name={'repeatPassword'}
                    onChange={onChange}
                    value={formState?.repeatPassword?.value!}
                    isValid={Boolean(formState?.repeatPassword?.error)}
                />
            </FormRow>
            <FormRow>
                <Button
                    onClick={handleSubmit}
                    isLoading={isOnSubmitBtnLoading}
                    disabled={Boolean(!formState?.password?.value || !formState?.repeatPassword?.value)}
                >
                    Save new password
                </Button>
            </FormRow>
        </form>
    )
}

export default RecoverPasswordForm
