import React from "react";
import { ResetPasswordWrapper } from "./ResetPasswordForm";
import InputText from "@/components/ui/form/elements/input/InputText";
import useForm from "@/components/ui/form/store/useForm";
import Button from "@/components/ui/button/Button";
import { useRouter } from "next/router";
import { Flex } from "@/components/ui/containers/flex/Flex";
import { SpanWarning } from "./SignupForm";
import { useGlobalCtx } from "@/common/global/useGlobalCtx";
import { useState } from "react";
import useJwtAuth from "../auth/useJwtAuth";
import { useGlobalPopupCtx } from "@/common/popup/useGlobalPopupCtx";
import { GLOBAL_POPUP_TYPES } from "@/common/popup/globalPopupRegistration";

function RecoverPasswordForm() {
    const { push } = useRouter();
    const { globalItems } = useGlobalCtx()
    const { changePassword } =  useJwtAuth()
    const { showGlobalPopup } = useGlobalPopupCtx()
    const [ isSuccessChangePass, setIsSuccessChangePass ] = useState(false)

    const [initialRecoverPasswordState] = useState({
        verifyNumber: { value: globalItems?.passwordResetVerifyCode, error: null },
        newPassword: { value: null, error: null },
        repeatNewPassword: { value: null, error: null },
    })
    const [ btnLoading, setBtnLoading ] = useState({
        isChangePassBtnLoading: false,
    })

    const { 
        onChange, 
        formState, 
        resetFormField, 
        setErrorField 
    } = useForm(initialRecoverPasswordState);

    async function handleChangePassword() {
        setBtnLoading(prev => ({
            ...prev,
            isChangePassBtnLoading: true
        }))
        try {
            const { newPassword, repeatNewPassword } = formState
        
            if( newPassword?.value !== repeatNewPassword?.value) {
                resetFormField('repeatNewPassword')
                setErrorField('repeatNewPassword', 'Password doesnt match')
                return
            }

            const res = await changePassword(newPassword?.value)
            
            if(res.status === 200 ) {
                if(res.data.editInfo || res.data.editInfo === "true"  ) {
                    setIsSuccessChangePass(true)
                    return
                }
            }
          
        } catch (e) { 
            console.error(e)
        } finally {
            setBtnLoading(prev => ({
                ...prev,
                isChangePassBtnLoading: false
            }))
        }
        
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if( isSuccessChangePass ) {
            push('/login')
        } else {
            await handleChangePassword()
        }
    }
    return (
        <ResetPasswordWrapper>
            <div className="col-5">
                <div className="row d-flex justify-content-center">
                    <div className="widget-login">
                        <h4 className="text-md mb-4 text-justify">
                            현재 사용하고 계신 비밀번호를 먼저 입력하신 후,
                            <br />
                            아래에 변경할 새 비밀번호를 입력하세요
                        </h4>
                        <form id="commentform" className="comment-form">
                            <fieldset className="email d-flex flex-column">
                                <label align="start">기존 비밀번호 *</label>
                                <InputText
                                    name={"verifyNumber"}
                                    onChange={onChange}
                                    value={formState?.verifyNumber?.value}
                                    isValid={Boolean(
                                        formState?.verifyNumber?.error
                                    )}
                                    placeholder="Verify Number"
                                    readOnly
                                />
                            </fieldset>
                            <fieldset className="email d-flex flex-column">
                                <label align="start">
                                    <Flex>
                                        비밀번호
                                        <SpanWarning>
                                            * 8~16자 / 대·소문자, 숫자, 특수문자
                                            조합
                                        </SpanWarning>
                                    </Flex>
                                </label>
                                <InputText
                                    name={"newPassword"}
                                    onChange={onChange}
                                    value={formState?.newPassword?.value}
                                    isValid={Boolean(
                                        formState?.newPassword?.error
                                    )}
                                    placeholder="newPassword"
                                />
                            </fieldset>
                            <fieldset className="email d-flex flex-column">
                                <label align="start">새 비밀번호 확인 *</label>
                                <InputText
                                    name={"repeatNewPassword"}
                                    onChange={onChange}
                                    value={
                                        formState?.repeatNewPassword?.value
                                    }
                                    isValid={Boolean(
                                        formState?.repeatNewPassword?.error
                                    )}
                                    placeholder="repeatNewPassword"
                                />
                            </fieldset>
                            <div className="btn-submit mb-30">
                                <Button
                                    className="tf-button style-1 h50 w-100"
                                    onClick={handleSubmit}
                                    isLoading={btnLoading.isChangePassBtnLoading}
                                >
                                   { isSuccessChangePass ? "Go to login" : "Change password" }
                                    <i className="icon-arrow-up-right2" />
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </ResetPasswordWrapper>
    );
}

export default RecoverPasswordForm;
