import Button from 'components/ui/button/Button'
import InputText from 'components/ui/form/elements/input/InputText'
import useForm from 'components/ui/form/store/useForm'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { emailTypes } from './SignupForm'
import useJwtAuth from '../auth/useJwtAuth'
import { GLOBAL_POPUP_TYPES } from 'a/common/popup/globalPopups/globalPopupRegistration'
import { useGlobalPopupCtx } from 'a/common/popup/globalPopups/useGlobalPopupCtx'
import { useGlobalCtx } from 'common/global/useGlobalCtx'
import { Flex } from 'components/ui/containers/flex/Flex'
import FormRow from 'a/components/ui/form/FormRow'
import Select1 from 'a/components/ui/form/elements/select/_choices/select1/Select1'
import { FormMainTitle } from 'a/features/asset/form/LicenseCreateForm'

const initialResetPasswordState = {
    email: { value: null, error: null },
    emailType: { value: 'gmail.com', error: null },
    verifyNumber: { value: null, error: null },
}

function ResetPasswordForm() {
    const { push } = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const { onChange, formState, setErrorField, onChangeWithoutEvent } = useForm(
        initialResetPasswordState
    )
    const { showGlobalPopup } = useGlobalPopupCtx()
    const { setGlobalItems } = useGlobalCtx()

    const { requestResetPassword } = useJwtAuth()

    const [otherEmailType, setOtherEmailType] = useState(null)
    process.env.NODE_ENV !== 'production' && console.log('otherEmailType', otherEmailType)

    const theEmail = formState?.email?.value + '@' + formState?.emailType?.value

    async function handleGetCode(e) {
        e.preventDefault()
        setIsLoading(true)
        try {
            if (!formState?.email?.value) {
                setErrorField('email', '이메일을 입력해주세요')
                return
            }

            const regex = /^[a-zA-Z0-9\.\-\:]+$/
            if (!regex.test(formState?.email?.value)) {
                setErrorField('email', '이메일이 유효하지 않습니다')
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: `이메일 입력란은 텍스트, 숫자, '.', '-' 문자여야 합니다.`,
                })
                return
            }
            process.env.NODE_ENV !== 'production'
            const res = await requestResetPassword(theEmail)
            process.env.NODE_ENV !== 'production' && console.log('res', res)
            if (res.status === 500) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: '올바른 이메일을 입력해주세요!',
                })
                return
            }
            if (res.status === 404) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: '등록되지 않은 이메일 주소가 있습니다!',
                })
                return
            }
            if (res.status === 200) {
                setGlobalItems((prev) => ({
                    ...prev,
                    resetPassword: {
                        email: theEmail,
                    },
                }))
                push('/reset-password/recover')
            }
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <FormMainTitle>비밀번호 재설정</FormMainTitle>
            <h4 className="mb-4 text-left">사용 중인 계정 이메일로 인증해 주세요.</h4>
            <form>
                <FormRow>
                    <label>이메일 *</label>
                    <Flex gap={2} align="center" className="sm:flex-row flex-col">
                        <Flex align="center">
                            <InputText
                                name={'email'}
                                onChange={onChange}
                                value={formState?.email?.value}
                                isValid={Boolean(formState?.email?.error)}
                                placeholder="email"
                            />
                            <h4 className="flex items-center px-2">@</h4>
                            {otherEmailType ? (
                                <InputText
                                    name={'emailType'}
                                    onChange={onChange}
                                    value={formState?.emailType?.value}
                                    isValid={Boolean(formState?.emailType?.error)}
                                    placeholder="emailType"
                                />
                            ) : (
                                <Select1
                                    width={130}
                                    name="emailType"
                                    options={emailTypes}
                                    defaultValue={emailTypes[0].label}
                                    onChangeWithoutEvent={onChangeWithoutEvent}
                                    callback={setOtherEmailType}
                                />
                            )}
                        </Flex>
                    </Flex>
                </FormRow>

                <Button
                    onClick={handleGetCode}
                    isLoading={isLoading}
                    disabled={Boolean(!formState?.email?.value) && !isLoading}
                >
                    발급 요청
                </Button>
            </form>
        </div>
    )
}

export default ResetPasswordForm
