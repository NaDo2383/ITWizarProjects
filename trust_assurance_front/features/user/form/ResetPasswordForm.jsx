import Button from '@/components/ui/button/Button'
import InputEmail from '@/components/ui/form/elements/input/InputEmail'
import InputText from '@/components/ui/form/elements/input/InputText'
import Select from '@/components/ui/form/elements/select/_choices/simpleSelect/Select'
import useForm from '@/components/ui/form/store/useForm'
import AtIcon from '@/components/ui/icon/AtIcon'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Layer, emailTypes } from './SignupForm'
import useJwtAuth from '../auth/useJwtAuth'
import { GLOBAL_POPUP_TYPES } from '@/common/popup/globalPopupRegistration'
import { useGlobalPopupCtx } from '@/common/popup/useGlobalPopupCtx'
import { useGlobalCtx } from '@/common/global/useGlobalCtx'
import { Flex } from '@/components/ui/containers/flex/Flex'
import FieldError from '@/components/ui/form/FieldError'

const initialResetPasswordState = {
    email: { value: null, error: null },
    emailType: { value: '', error: null },
    verifyNumber: { value: null, error: null },
}

function ResetPasswordForm() {
    const { push } = useRouter()
    const {
        onChange,
        onError,
        formState,
        resetFormField,
        setErrorField
    } = useForm(initialResetPasswordState)
    const { showGlobalPopup } = useGlobalPopupCtx()
    const { setGlobalItems, globalItems } = useGlobalCtx()

    const { requestResetPassword, requestVerify, getTemporaryPassword } = useJwtAuth()
    const [btnLoading, setBtnLoading] = useState({
        isRequestBtnLoading: false,
        isVerifyCheckBtnLoading: false,
        isPasswordSignLoading: false,
    })
    const [isMailVerified, setIsMailVerified] = useState(false)
    const [isEnableRequestForm, setIsEnableRequestForm] = useState(false)
    const [verifyCode, setVerifyCode] = useState(null)


    const theEmail = formState?.email?.value + '@' + formState?.emailType?.value

    async function handleRequest(e) {
        e.preventDefault()
        setBtnLoading(prev => ({
            ...prev,
            isRequestBtnLoading: true
        }))
        try {
            if (!formState?.email?.value) {
                setErrorField('email', '이메일을 입력해주세요')
                return
            }
            const regex = /^[a-zA-Z0-9\.\-\:]+$/;
            if (!regex.test(formState?.email?.value)) {
                setErrorField('email', '이메일이 유효하지 않습니다')
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT,
                    { message: `이메일 형식이 올바르지 않습니다.` })
                return
            }

            const res = await requestResetPassword(theEmail)

            if (res.status === 500) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT,
                    { message: '올바른 이메일을 입력해주세요!' })
                return
            }
            if (res.status === 200) {
                setIsMailVerified(true)
                setGlobalItems(prev => ({
                    ...prev,
                    passwordResetVerifyCode: res?.data?.code,
                    passwordResetId: res?.data.id
                }))
            }
        } catch (e) {
            console.error(e)
        } finally {
            setBtnLoading(prev => ({
                ...prev,
                isRequestBtnLoading: false
            }))
        }
    }

    async function handleTemporaryPassword(e) {
        e.preventDefault()
        setBtnLoading(prev => ({
            ...prev,
            isPasswordSignLoading: true
        }))
        try {
            if (!formState?.verifyNumber?.value || !formState?.email?.value) {
                setErrorField('verifyNumber', '인증번호를 입력해주세요')
                setErrorField('email', '이메일을 입력해주세요')
                return
            }
            const payload = {
                email: theEmail,
                id: globalItems?.passwordResetId
            }
            const res = await getTemporaryPassword(payload)
            if (res.status === 200) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: `이메일을 통해 발급된 임시 비밀번호를 사용하여 로그인해주세요.`,
                    button: {
                        text: '확인',
                        width: 150
                    },
                    ok: async () => push('/login')
                })
            }
            if (res.status === 400 || res.status === 401 || res.status === 404) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: `Bad request. ${res.status}`,
                })
            }
            if (res.status === 500) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: `서버에 문제가 있거나 인터넷 연결을 확인하세요!`,
                })
            }
        } catch (e) {
            console.error(e)
        } finally {
            setBtnLoading(prev => ({
                ...prev,
                isPasswordSignLoading: false
            }))
        }
    }

    function handleCertificationNumber(e) {
        e.preventDefault()
        setBtnLoading(prev => ({
            ...prev,
            isVerifyCheckBtnLoading: true
        }))
        try {
            if (globalItems?.passwordResetVerifyCode !== formState?.verifyNumber?.value) {
                setErrorField('verifyNumber', '번호가 일치하지 않는지 확인하세요! 이메일을 확인.')
                setIsEnableRequestForm(false)
                return
            }
            setIsEnableRequestForm(true)
            showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT,
                { message: '인증이 완료되었습니다.' })

        } catch (e) {
            console.error(e)
        } finally {
            setBtnLoading(prev => ({
                ...prev,
                isVerifyCheckBtnLoading: false
            }))
        }
    }
    return (
        <ResetPasswordWrapper className=''>
            <h2>임시 비밀번호 발급 </h2>
            <div className="col-5">
                <div className='row d-flex justify-content-center'>
                    <div className="widget-login">
                        <h4 className='text-md mb-4'>사용 중인 계정 이메일로 인증해 주세요.</h4>
                        <form id="commentform" className="comment-form">
                            <fieldset className="email d-flex flex-column">
                                <label align="start">이메일 *</label>
                                <div className='row'>
                                    <div className='col-9'>
                                        <Flex>
                                            <div>
                                                <InputText
                                                    name={'email'}
                                                    onChange={onChange}
                                                    value={formState?.email?.value}
                                                    isValid={Boolean(formState?.email?.error)}
                                                    placeholder="email"
                                                />
                                                <FieldError text={formState?.email?.error} />
                                            </div>
                                            <Flex>
                                                <h4 className="mx-2 mt-10">@</h4>
                                            </Flex>
                                            <Select
                                                name="emailType"
                                                options={emailTypes}
                                                defaultValue={emailTypes[0].label}
                                                onChange={onChange}
                                                formState={formState}
                                            />
                                        </Flex>
                                    </div>
                                    <div className='col-3'>
                                        <Button
                                            onClick={handleRequest}
                                            isLoading={btnLoading.isRequestBtnLoading}
                                        >
                                            인증요청
                                        </Button>
                                    </div>
                                </div>
                            </fieldset>
                            {/* <Layer isallow={isMailVerified.toString()}> */}
                            <fieldset className="email d-flex flex-column">
                                <label align="start">인증번호 입력 *</label>
                                <div className='row'>
                                    <div className='col-9'>
                                        <InputText
                                            name={'verifyNumber'}
                                            onChange={onChange}
                                            value={formState?.verifyNumber?.value}
                                            isValid={Boolean(formState?.verifyNumber?.error)}
                                            placeholder="Verify Number"
                                        />
                                        <FieldError text={formState?.verifyNumber?.error} />
                                    </div>
                                    <div className='col-3'>
                                        <Button
                                            onClick={handleCertificationNumber}
                                            isLoading={btnLoading.isVerifyCheckBtnLoading}
                                        >
                                            확인
                                        </Button>
                                    </div>
                                </div>

                            </fieldset>

                            <div className="btn-submit mb-30">
                                <Button
                                    className="tf-button style-1 h50 w-100"
                                    onClick={handleTemporaryPassword}
                                    isLoading={btnLoading.isPasswordSignLoading}
                                    disabled={!isEnableRequestForm}
                                >
                                    임시 비밀번호 발급
                                    <i className="icon-arrow-up-right2" />
                                </Button>
                            </div>
                            {/* </Layer> */}
                        </form>
                    </div>
                </div>
            </div>
        </ResetPasswordWrapper>
    )
}

export const ResetPasswordWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    height: inherit;
    width:100%;
`

export default ResetPasswordForm