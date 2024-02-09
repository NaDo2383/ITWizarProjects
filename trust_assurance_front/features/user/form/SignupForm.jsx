import React, { useState } from "react";
import InputText from "@/components/ui/form/elements/input/InputText";
import useForm from "@/components/ui/form/store/useForm";
import Button from "@/components/ui/button/Button";
import InputPassword from "@/components/ui/form/elements/input/InputPassword";
import InputEmail from "@/components/ui/form/elements/input/InputEmail";
import Select from "@/components/ui/form/elements/select/_choices/simpleSelect/Select";
import AtIcon from "@/components/ui/icon/AtIcon";
import { validateForm } from "@/common/validation/validate";
import { signupFormSchema } from "./signupFormSchema";
import RadioGroup from "@/components/ui/form/elements/radio/RadioGroup";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Flex } from "@/components/ui/containers/flex/Flex";
import useJwtAuth from "../auth/useJwtAuth";
import { usePopupCtx } from "@/common/popup/usePopupCtx";
import { useGlobalPopupCtx } from "@/common/popup/useGlobalPopupCtx";
import { GLOBAL_POPUP_TYPES } from "@/common/popup/globalPopupRegistration";
import FieldError from "@/components/ui/form/FieldError";
import { membershipType } from "@/libs/constants";
import useSelect from "@/components/ui/form/elements/select/useSelect";
const initialSignUpState = {
    membershipType: { value: membershipType.GENERAL, error: null },
    id: { value: null, error: null },
    password: { value: null, error: null },
    checkPassword: { value: null, error: null },
    name: { value: null, error: null },
    gender: { value: 0, error: null },
    email: { value: null, error: null },
    emailType: { value: "", error: null },
    verifyNumber: { value: null, error: null },
};
export const emailTypes = [
    { label: "이메일 선택", value: "" },
    { label: "gmail.com", value: "gmail.com" },
    { label: "yahoo.com", value: "yahoo.com" },
    { label: "outlook.com", value: "outlook.com" },
    { label: "icloud.com", value: "icloud.com" },
    { label: "직접입력", value: "직접입력" },
];

function SignupForm() {
    const genderOptions = [
        { label: 'male', value: 0 },
        { label: 'female', value: 1 },
        { label: 'etc', value: 2 },
    ]

    const radioOptions = [
        { label: "일반회원", value: membershipType.GENERAL },
        { label: "콘텐츠 제공자", value: membershipType.CONTENT_PROVIDER },
    ];
    const { push } = useRouter();
    const { showGlobalPopup } = useGlobalPopupCtx()
    const [btnLoading, setBtnLoading] = useState({
        isCheckIdBtnLoading: false,
        isCheckMailBtnLoading: false,
        isSignUpBtnLoading: false,
    })
    const [isIdChecked, setIsIdChecked] = useState(false)
    const [isMailVerified, setIsMailVerified] = useState(false)
    const [isMailTypeInput, setIsMailTypeInput] = useState(false)

    const {
        onChange,
        onError,
        formState,
        onChangeWithoutEvent,
        resetFormField,
        setErrorField
    } = useForm(initialSignUpState);
    const { checkId, signUpUser, requestVerify } = useJwtAuth()

    const [verifyCode, setVerifyCode] = useState(null)

    const theEmail = formState?.email?.value + '@' + formState?.emailType?.value
    const isEnableSubmitBtn = isIdChecked && isMailVerified

    async function handleCheckId(e) {
        e.preventDefault()
        setBtnLoading(prev => ({
            ...prev,
            isCheckIdBtnLoading: true
        }))
        try {
            if (!formState?.id?.value) return
            const res = await checkId(formState?.id?.value)
            setBtnLoading(prev => ({
                ...prev,
                isCheckIdBtnLoading: true
            }))
            if (res.data.isId) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT,
                    { message: '이미 존재하는 아이디입니다.' })

                // resetFormField('id')
                setIsIdChecked(false)
                setErrorField('id', 'please insert different id', formState?.id?.value)
            } else {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT,
                    { message: '사용 가능한 아이디입니다.' })
                setIsIdChecked(true)
            }
        } catch (e) {
            console.error(e)
        } finally {
            setBtnLoading(prev => ({
                ...prev,
                isCheckIdBtnLoading: false
            }))
        }
    }

    async function handleRequestVerify(e) {
        e.preventDefault()
        setIsMailTypeInput(true)
        setBtnLoading(prev => ({
            ...prev,
            isCheckMailBtnLoading: true
        }))
        try {
            if (!formState?.email?.value) return

            const regex = /^[a-zA-Z0-9\.\-\:]+$/;

            if (!regex.test(formState?.email?.value)) {
                setErrorField('email', '이메일이 유효하지 않습니다')
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT,
                    { message: `이메일 형식이 올바르지 않습니다.` })
                return
            }

            const res = await requestVerify(theEmail)

            if (res.status === 200) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT,
                    { message: `해당 이메일 주소로 인증번호가 발송되었습니다.` })
                setIsMailVerified(true)
                setVerifyCode(res.data.code)
            } else {
                setIsMailTypeInput(false)
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT,
                    { message: `인증번호 전송 중 오류가 발생했습니다` })
            }
        } catch (e) {
            console.error(e)
        } finally {
            setBtnLoading(prev => ({
                ...prev,
                isCheckMailBtnLoading: false
            }))
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setBtnLoading(prev => ({
            ...prev,
            isSignUpBtnLoading: true
        }))
        try {
            if (!isEnableSubmitBtn) {
                return
            }

            if (verifyCode !== formState?.verifyNumber?.value) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT,
                    { message: '이메일 또는 인증번호가 유효한지 확인해 주세요.' })
                setErrorField('verifyNumber', '번호가 유효하지 않은지 확인하세요. 이메일을 확인해주세요')
                return
            }

            if (formState?.password?.value !== formState?.checkPassword?.value) {
                resetFormField('checkPassword')
                setErrorField('checkPassword', '비밀번호가 일치하지 않습니다')
                return
            }

            const payload = {
                memberShipType: formState?.membershipType?.value,
                id: formState?.id?.value,
                password: formState?.password?.value,
                name: formState?.name?.value,
                gender: formState?.gender?.value,
                email: theEmail,
                gender: Number(formState?.gender?.value),
                verifyNumber: formState?.verifyNumber?.value,
            }
            const theFormState = {
                ...formState,
                email: {
                    ...formState.email,
                    value: theEmail
                }
            }
            const { success, errors } = await validateForm(signupFormSchema, theFormState)
            if (!success) {
                onError(errors)
                console.error('validation амжилтгүй', errors)
                return
            }

            const res = await signUpUser(payload)
            if (res.data.signUp === 'true') {
                push("/sign-up/completed");
                return
            } else {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, { message: '이미 가입된 이메일입니다.' })
            }
        } catch (e) {

        } finally {
            setBtnLoading(prev => ({
                ...prev,
                isSignUpBtnLoading: false
            }))
        }
    }

    const enableWriteId = (e) => {
        e.preventDefault();
        setIsIdChecked(false)
    }

    const enableChangeMail = (e) => {
        e.preventDefault();
        setIsMailTypeInput(false)
    }

    return (
        <div className="col-12">
            <div className="widget-login">
                <form id="commentform" className="comment-form">
                    <fieldset className="radio">
                        <RadioGroup
                            name="membershipType"
                            options={radioOptions}
                            onChange={onChange}
                            defaultValue={radioOptions[0].value}
                        />
                    </fieldset>
                    <fieldset className="name">
                        <label>아이디 *</label>
                        <div className="row">
                            <div className="col-8">
                                <InputText
                                    name={"id"}
                                    onChange={onChange}
                                    value={formState?.id?.value}
                                    isValid={Boolean(
                                        formState?.id?.error
                                    )}
                                    placeholder="id"
                                    isDisabled={isIdChecked}
                                />
                            </div>
                            <div className="col-4">
                                {isIdChecked ?
                                    <Button
                                        onClick={(e) => enableWriteId(e)}
                                    >
                                        아이디 변경
                                    </Button>
                                    :
                                    <Button
                                        disabled={formState?.id?.value ? false : true}
                                        onClick={handleCheckId}
                                        isLoading={btnLoading.isCheckIdBtnLoading}
                                    >
                                        중복확인
                                    </Button>
                                }
                            </div>
                        </div>
                    </fieldset>
                    <Layer isallow={isIdChecked.toString()}>
                        <fieldset className="password">
                            <label>
                                <Flex>
                                    비밀번호
                                    <SpanWarning>
                                        * 8~16자 / 대·소문자, 숫자, 특수문자 조합
                                    </SpanWarning>
                                </Flex>
                            </label>
                            <InputPassword
                                name={"password"}
                                onChange={onChange}
                                value={formState?.password?.value}
                                isValid={Boolean(formState?.password?.error)}
                                placeholder="비밀번호"
                            />
                            <FieldError text={formState?.password?.error} />
                        </fieldset>
                        <fieldset className="password">
                            <label>비밀번호 확인 *</label>
                            <InputPassword
                                name={"checkPassword"}
                                onChange={onChange}
                                value={formState?.checkPassword?.value}
                                isValid={Boolean(formState?.checkPassword?.error)}
                                placeholder="비밀번호 확인"
                            />
                            <FieldError text={formState?.checkPassword?.error} />
                            {/* <EyeIcon /> */}
                        </fieldset>
                        <fieldset className="email">
                            <label>이름 *</label>
                            <InputText
                                name={"name"}
                                onChange={onChange}
                                value={formState?.name?.value}
                                isValid={Boolean(formState?.name?.error)}
                                placeholder="name"
                            />
                        </fieldset>
                        <fieldset className="email">
                            <label>성별 *</label>
                            <Select
                                name="gender"
                                options={genderOptions}
                                defaultValue={genderOptions[0].label}
                                onChange={onChange}
                            />
                        </fieldset>
                        <fieldset className="email">
                            <label>이메일 *</label>
                            <Flex gap={20} align="center">
                                <InputEmail
                                    name={"email"}
                                    onChange={onChange}
                                    value={formState?.email?.value}
                                    isValid={Boolean(formState?.email?.error)}
                                    placeholder="email"
                                    isDisabled={isMailTypeInput}
                                />
                                <h4 className="flex items-center">@</h4>
                                <Select
                                    name="emailType"
                                    options={emailTypes}
                                    defaultValue={emailTypes[0].label}
                                    onChange={onChange}
                                    icon={<AtIcon />}
                                    formState={formState}
                                    isDisabled={isMailTypeInput}
                                />
                                {
                                    isMailTypeInput ?
                                        <Button
                                            onClick={(e) => enableChangeMail(e)}
                                            disabled={formState?.email?.value ? false : true}
                                        >
                                            메일 변경
                                        </Button>
                                        :
                                        <Button
                                            onClick={handleRequestVerify}
                                            isLoading={btnLoading.isCheckMailBtnLoading}
                                            disabled={formState?.email?.value ? false : true}
                                        >
                                            인증요청
                                        </Button>
                                }
                            </Flex>
                        </fieldset>
                        <VerifyLayer isallow={isMailVerified.toString()}>
                            <fieldset className="email">
                                <label>인증번호 *</label>
                                <InputText
                                    name={"verifyNumber"}
                                    onChange={onChange}
                                    value={formState?.verifyNumber?.value}
                                    isValid={Boolean(formState?.verifyNumber?.error)}
                                    placeholder="Verify Number"
                                />
                            </fieldset>
                        </VerifyLayer>
                    </Layer>
                    <div className="btn-submit mb-30">
                        <Button
                            className={`tf-button style-1 h50 w-100`}
                            onClick={handleSubmit}
                            isLoading={btnLoading.isSignUpBtnLoading}
                            disabled={formState?.verifyNumber?.value ? false : true}
                        >
                            회원가입
                            <i className="icon-arrow-up-right2" />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export const SpanWarning = styled.div`
    color: #668ccf;
    font-size: 12px;
`;

export const Layer = styled.div`
    pointer-events: ${p => p.isallow === 'true' ? 'auto' : 'none'};
`

export const VerifyLayer = styled.div`
    pointer-events: ${p => p.isallow === 'true' ? 'auto' : 'none'};
`

const ErrorField = styled.div`
    display:flex;
    justify-content: flex-end;
    color: red;
    margin-top: 10px;
`

export default SignupForm;
