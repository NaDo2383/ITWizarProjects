import { useGlobalCtx } from 'a/common/global/useGlobalCtx'
import { useGlobalPopupCtx } from 'a/common/popup/globalPopups/useGlobalPopupCtx'
import Button from 'a/components/ui/button/Button'
import FormRow from 'a/components/ui/form/FormRow'
import InputNumber from 'a/components/ui/form/elements/input/InputNumber'
import InputPassword from 'a/components/ui/form/elements/input/InputPassword'
import useForm from 'a/components/ui/form/store/useForm'
import { Label } from 'a/components/ui/typography/Label'
import React, { useEffect, useState } from 'react'
import useJwtAuth from '../auth/useJwtAuth'
import { GLOBAL_POPUP_TYPES } from 'a/common/popup/globalPopups/globalPopupRegistration'
import { useRouter } from 'next/navigation'
import { validateForm } from 'a/common/validation/validate'
import { recoverPasswordFormSchema } from './recoverPasswordSchema'

const initialFormState = {
    certNum: { value: null, error: null },
    password: { value: null, error: null },
    repeatPassword: { value: null, error: null },
}

function RecoverPasswordForm() {
    const { push } = useRouter()
    const { showGlobalPopup } = useGlobalPopupCtx()
    const [isOnSubmitBtnLoading, setIsOnSubmitBtnLoading] = useState(false)
    const { onChange, formState, resetFormField, setErrorField, onError } =
        useForm(initialFormState)
    const { globalItems } = useGlobalCtx()
    const { changePassword } = useJwtAuth()
    useEffect(() => {
        if (!globalItems?.resetPassword) {
            push('/reset-password')
        }
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        setIsOnSubmitBtnLoading(true)
        try {
            if (!formState?.certNum?.value) {
                setErrorField('certNum', '인증서 번호가 잘못되었습니다.')
                return
            }

            const payload = {
                password: formState?.password?.value,
                email: globalItems?.resetPassword?.email,
                certNum: formState?.certNum?.value,
            }

            const { success, errors } = await validateForm(
                recoverPasswordFormSchema,
                formState
            )

            if (!success) {
                onError(errors)
                return
            }
            if (formState?.password?.value !== formState?.repeatPassword?.value) {
                resetFormField('repeatPassword')
                setErrorField('repeatPassword', '비밀번호가 일치하지 않습니다.')
                return
            }

            const res = await changePassword(payload)
            if (res.status === 404) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: '인증번호를 다시 확인해 주세요.',
                })
                return
            }
            if (res.status === 200) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: '비밀번호를 성공적으로 변경했습니다',
                })
                push('/')
            }
        } catch (e) {
            console.error(e)
        } finally {
            setIsOnSubmitBtnLoading(false)
        }
    }

    return (
        <form>
            <FormRow className="gap-2" errMsg={formState?.certNum?.error}>
                <Label>인증번호:</Label>
                <InputNumber
                    name={'certNum'}
                    onChange={onChange}
                    value={formState?.certNum?.value}
                    isValid={Boolean(formState?.certNum?.error)}
                    placeholder="인증번호"
                />
            </FormRow>
            <FormRow className="gap-2" errMsg={formState?.password?.error}>
                <Label>새 비밀번호:</Label>
                <InputPassword
                    name={'password'}
                    onChange={onChange}
                    value={formState?.password?.value}
                    isValid={Boolean(formState?.password?.error)}
                    placeholder="비밀번호"
                />
            </FormRow>
            <FormRow className="gap-2" errMsg={formState?.repeatPassword?.error}>
                <Label>새 비밀번호 확인:</Label>
                <InputPassword
                    name={'repeatPassword'}
                    onChange={onChange}
                    value={formState?.repeatPassword?.value}
                    isValid={Boolean(formState?.repeatPassword?.error)}
                    placeholder="비밀번호 확인"
                />
            </FormRow>
            <FormRow>
                <Button
                    onClick={handleSubmit}
                    isLoading={isOnSubmitBtnLoading}
                    disabled={Boolean(
                        !formState?.password?.value || !formState?.repeatPassword?.value
                    )}
                >
                    비밀번호 변경하기
                </Button>
            </FormRow>
        </form>
    )
}

export default RecoverPasswordForm
