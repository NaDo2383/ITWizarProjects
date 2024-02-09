import React, { useEffect, useState } from 'react'
import InputText from 'components/ui/form/elements/input/InputText'
import useForm from 'components/ui/form/store/useForm'
import Button from 'components/ui/button/Button'
import InputPassword from 'components/ui/form/elements/input/InputPassword'
import InputEmail from 'components/ui/form/elements/input/InputEmail'
import { validateForm } from 'common/validation/validate'
import { signupFormSchema } from './signupFormSchema'
import { useRouter } from 'next/router'
import { Flex } from 'components/ui/containers/flex/Flex'
import useJwtAuth from '../auth/useJwtAuth'
import { useGlobalPopupCtx } from 'a/common/popup/globalPopups/useGlobalPopupCtx'
import { GLOBAL_POPUP_TYPES } from 'a/common/popup/globalPopups/globalPopupRegistration'
//import { membershipType } from 'libs/constants'
import FormRow from 'a/components/ui/form/FormRow'
import Select1 from 'a/components/ui/form/elements/select/_choices/select1/Select1'
import { Label } from 'a/components/ui/typography/Label'
import tw from 'tailwind-styled-components'

const initialSignUpState = {
    username: { value: null, error: null },
    name: { value: null, error: null },
    password: { value: null, error: null },
    passwordConfirm: { value: null, error: null },
    email: { value: null, error: null },
    emailType: { value: 'gmail.com', error: null },
    certNum: { value: null, error: null },
}
export const emailTypes = [
    { id: 0, label: 'gmail.com', value: 'gmail.com' },
    { id: 1, label: 'yahoo.com', value: 'yahoo.com' },
    { id: 2, label: 'outlook.com', value: 'outlook.com' },
    { id: 3, label: 'icloud.com', value: 'icloud.com' },
    { id: 4, label: '직접 입력', value: 'other' },
]

function SignupForm() {
    // const genderOptions = [
    //     { Label: 'male', value: 0 },
    //     { Label: 'female', value: 1 },
    //     { Label: 'etc', value: 2 },
    // ]

    // const radioOptions = [
    //     { Label: '일반회원', value: membershipType.GENERAL },
    //     { Label: '콘텐츠 제공자', value: membershipType.CONTENT_PROVIDER },
    // ]
    const { push } = useRouter()
    const { showGlobalPopup } = useGlobalPopupCtx()
    const [btnLoading, setBtnLoading] = useState({
        isCheckIdBtnLoading: false,
        isCheckMailBtnLoading: false,
        isSignUpBtnLoading: false,
    })
    const [isIdChecked, setIsIdChecked] = useState(false)
    const [isMailVerified, setIsMailVerified] = useState(false)

    const {
        onChange,
        onError,
        formState,
        onChangeWithoutEvent,
        resetFormField,
        setErrorField,
    } = useForm(initialSignUpState)
    const { checkId, signUpUser, requestVerify } = useJwtAuth()

    const [otherEmailType, setOtherEmailType] = useState(null)

    const theEmail = formState?.email?.value + '@' + formState?.emailType?.value
    const isEnableSubmitBtn = isIdChecked && isMailVerified

    async function handleCheckId(e) {
        e.preventDefault()
        setBtnLoading((prev) => ({
            ...prev,
            isCheckIdBtnLoading: true,
        }))
        try {
            if (!formState?.username?.value) return
            const res = await checkId(formState?.username?.value)

            if (res.status === 400) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: '이미 존재하는 아이디입니다.',
                })
                resetFormField('username')
                setErrorField('username', '이미 존재하는 아이디입니다.')
            }
            if (res.status === 200) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: '사용 가능한 아이디입니다.',
                })
                setIsIdChecked(true)
            }
            if (res.status === 500) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: 'Server error.',
                })
            }
        } catch (e) {
            console.error(e)
        } finally {
            setBtnLoading((prev) => ({
                ...prev,
                isCheckIdBtnLoading: false,
            }))
        }
    }

    async function handleRequestVerify(e) {
        e.preventDefault()
        setBtnLoading((prev) => ({
            ...prev,
            isCheckMailBtnLoading: true,
        }))
        try {
            if (!formState?.email?.value) return
            const regex = /^[a-zA-Z0-9\.\-\:]+$/
            if (!regex.test(formState?.email?.value)) {
                setErrorField('email', '이메일 형식이 올바르지 않습니다.')
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: `이메일 형식이 올바르지 않습니다.`,
                })
                return
            }

            const res = await requestVerify(theEmail)

            if (res.status === 200) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: `이메일을 확인해 주세요.`,
                })
                setIsMailVerified(true)
            } else if (res?.data?.message === 'email.exist') {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: `이미 가입된 이메일 주소입니다.`,
                })
            } else {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: `이메일 등록 시 애러가 발생했습니다.`,
                })
            }
        } catch (e) {
            console.error(e)
        } finally {
            setBtnLoading((prev) => ({
                ...prev,
                isCheckMailBtnLoading: false,
            }))
        }
    }
    console.log(formState)

    async function handleSubmit(e) {
        e.preventDefault()
        setBtnLoading((prev) => ({
            ...prev,
            isSignUpBtnLoading: true,
        }))
        try {
            if (!isEnableSubmitBtn) {
                return
            }

            if (formState?.password?.value !== formState?.checkPassword?.value) {
                resetFormField('checkPassword')
                setErrorField('checkPassword', '비밀번호가 일치하지 않습니다.')
                return
            }

            const payload = {
                username: formState?.username?.value,
                name: formState?.name?.value,
                password: formState?.password?.value,
                passwordConfirm: formState?.passwordConfirm?.value,
                email: theEmail,
                certNum: +formState?.certNum?.value,
            }
            const theFormState = {
                ...formState,
                email: {
                    ...formState.email,
                    value: theEmail,
                },
            }
            const { success, errors } = await validateForm(signupFormSchema, theFormState)
            if (!success) {
                onError(errors)
                return
            }

            const res = await signUpUser(payload)
            if (res.status === 200) {
                push('/sign-up/completed')
                return
            }
            if (res.status === 404) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: '404 not found',
                })
                return
            }
            if (res.status === 500) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: '500 server error',
                })
                return
            }
        } catch (e) {
            console.error(e)
        } finally {
            setBtnLoading((prev) => ({
                ...prev,
                isSignUpBtnLoading: false,
            }))
        }
    }

    useEffect(() => {
        if (formState?.password?.error) {
            showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                message: formState?.password?.error,
            })
            return
        }
    }, [formState?.password?.error])

    return (
        <form>
            <FormRow errMsg={formState?.username?.error} className={`gap-1`}>
                <Label className="text-jacarta-600">아이디</Label>
                <Flex gap={2}>
                    <InputText
                        name={'username'}
                        onChange={onChange}
                        value={formState?.username?.value}
                        isValid={Boolean(formState?.username?.error)}
                        placeholder="아이디"
                    />
                    <Button
                        width={250}
                        onClick={handleCheckId}
                        disabled={btnLoading.isCheckIdBtnLoading}
                        isLoading={btnLoading.isCheckIdBtnLoading}
                        //disabled={formState?.username?.value ? false : true}
                    >
                        중복확인
                    </Button>
                </Flex>
            </FormRow>
            <Layer isallow={isIdChecked.toString()} style={{ marginBottom: '30px' }}>
                <FormRow className={`gap-1`}>
                    <Label className="text-jacarta-600">
                        <Flex className="flex sm:flex-row flex-col">
                            비밀번호
                            <SpanWarning>
                                * 8~16자 / 대·소문자, 숫자, 특수문자 조합
                            </SpanWarning>
                        </Flex>
                    </Label>
                    <InputPassword
                        name={'password'}
                        onChange={onChange}
                        value={formState?.password?.value}
                        isValid={Boolean(formState?.password?.error)}
                        placeholder="비밀번호"
                    />
                </FormRow>
                <FormRow errMsg={formState?.checkPassword?.error} className={`gap-1`}>
                    <Label className="text-jacarta-600">비밀번호 확인</Label>
                    <InputPassword
                        name={'checkPassword'}
                        onChange={onChange}
                        value={formState?.checkPassword?.value}
                        isValid={Boolean(formState?.checkPassword?.error)}
                        placeholder="비밀번호 확인"
                    />
                </FormRow>
                <FormRow errMsg={formState?.name?.error} className={`gap-1`}>
                    <Label className="text-jacarta-600">이름</Label>
                    <InputText
                        name={'name'}
                        onChange={onChange}
                        value={formState?.name?.value}
                        isValid={Boolean(formState?.name?.error)}
                        placeholder="이름"
                    />
                </FormRow>
                <FormRow className={`gap-1`}>
                    <Label className="text-jacarta-600">이메일</Label>
                    <Flex gap={2} align="center" className="flex sm:flex-row flex-col">
                        <Flex align="center">
                            <InputEmail
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
                        <Button
                            onClick={handleRequestVerify}
                            isLoading={btnLoading.isCheckMailBtnLoading}
                            disabled={btnLoading.isCheckMailBtnLoading}
                        >
                            인증요청
                        </Button>
                    </Flex>
                </FormRow>
                <VerifyLayer isallow={isMailVerified.toString()}>
                    <FormRow className={`gap-1`}>
                        <Label className="text-jacarta-600">인증번호</Label>
                        <InputText
                            name={'certNum'}
                            onChange={onChange}
                            value={formState?.certNum?.value}
                            isValid={Boolean(formState?.certNum?.error)}
                            placeholder="Verify Number"
                        />
                    </FormRow>
                </VerifyLayer>
            </Layer>
            <Button
                className="tf-button style-1 h-50 w-100"
                onClick={handleSubmit}
                isLoading={btnLoading.isSignUpBtnLoading}
                disabled={btnLoading.isSignUpBtnLoading}
            >
                회원가입
                <i className="icon-arrow-up-right2" />
            </Button>
        </form>
    )
}

export const SpanWarning = tw.div`
    text-[#668ccf]
`

export const Layer = tw.div`
  ${(p) =>
      p.isallow === 'true'
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-50'}
`
export const VerifyLayer = tw.div`
    ${(p) => (p.isallow === 'true' ? 'pointer-events-auto' : 'pointer-events-none')}
`

export default SignupForm
