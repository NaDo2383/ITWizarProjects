import { getAuthToken } from '@/common/token/token'
import { validateForm } from '@/common/validation/validate'
import { OutlineBtn } from '@/components/ui/button/OutlineBtn'
import InputPassword from '@/components/ui/form/elements/input/InputPassword'
import useForm from '@/components/ui/form/store/useForm'
import { useUserCtx } from '@/features/user/useUserCtx'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { changePasswordFormSchema } from './changePasswordSchema'
import useUser from '@/features/user/useUser'
import Button from '@/components/ui/button/Button'
import { useRouter } from 'next/router'
import { useGlobalCtx } from '@/common/global/useGlobalCtx'
import FieldError from '@/components/ui/form/FieldError'
import { Flex } from '@/components/ui/containers/flex/Flex'
import { useGlobalPopupCtx } from '@/common/popup/useGlobalPopupCtx'
import { GLOBAL_POPUP_TYPES } from '@/common/popup/globalPopupRegistration'
import useToken from '@/common/token/useToken'

function ChangePasswordForm() {
    const { push } = useRouter()
    const [isPasswordEdit, setIsPasswordEdit] = useState(false)
    const [btnLoading, setBtnLoading] = useState({
        isUpdateBtnLoading: false
    })
    const [token, setToken] = useState();
    const { showGlobalPopup } = useGlobalPopupCtx()
    const { myPageState } = useGlobalCtx()
    const { userInfo } = useUserCtx()
    const { updateUserInfo } = useUser()
    const { getAuthToken } = useToken();
    const [initialPasswordFormData] = useState({
        password: { value: null, error: null },
        repeatPassword: { value: null, error: null },
    })
    const {
        onChange,
        formState,
        onError,
        setValueField,
        setErrorField,
        onChangeFile
    } = useForm(initialPasswordFormData)


    useEffect(() => {
        myPageState?.isProfileEdit && setIsPasswordEdit(false)
    }, [myPageState?.isProfileEdit])

    async function onSubmit(e) {
        e.preventDefault()
        setBtnLoading(prev => ({
            ...prev,
            isUpdateBtnLoading: true
        }))
        try {
            getAuthToken().then(async (res) => {
                setToken(res)

                if (res) {
                    if (formState?.password?.value !== formState?.repeatPassword?.value) {
                        setErrorField("repeatPassword", "비밀번호 반복이 일치하지 않습니다")
                        return
                    }

                    const payload = {
                        accessToken: res,
                        password: formState?.password?.value
                    }
                    const { success, errors } = await validateForm(changePasswordFormSchema, formState)

                    if (!success) {
                        onError(errors)
                        return
                    }
                    const res1 = await updateUserInfo(payload)
                    if (res1.status === 200) {
                        if (res1.data.editInfo || res1.data.editInfo === "true") {
                            showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT,
                                { message: "비밀번호가 성공적으로 변경되었습니다!" })
                            setIsPasswordEdit(false)
                            return
                        }
                    }
                }
            });
        } catch (e) {
            console.error(e)
        } finally {
            setBtnLoading(prev => ({
                ...prev,
                isUpdateBtnLoading: false
            }))
        }
    }
    return (
        <>
            <div className="table-item">
                <div className="column">
                    <h6 className="price gem">
                        비밀번호
                    </h6>
                </div>
                <div className="column">
                    {
                        !isPasswordEdit ? (
                            <>
                                <OutlineBtn onClick={() => setIsPasswordEdit(true)}>
                                    비밀번호 업데이트
                                </OutlineBtn>
                            </>
                        ) : (
                            <InputPassword
                                name={"password"}
                                onChange={onChange}
                                value={formState?.password?.value}
                                isValid={Boolean(formState?.password?.error)}
                                placeholder="비밀번호"
                            />
                        )
                    }
                </div>
            </div>
            {
                isPasswordEdit && (
                    <>
                        <div className="table-item">
                            <div className="column">
                                <h6 className="price gem">
                                    비밀번호 확인 *
                                </h6>
                            </div>
                            <div className="column">
                                <Flex column width="100%">
                                    <InputPassword
                                        name={"repeatPassword"}
                                        onChange={onChange}
                                        value={formState?.repeatPassword?.value}
                                        isValid={Boolean(formState?.repeatPassword?.error)}
                                        placeholder="비밀번호 확인"
                                    />
                                    <FieldError text={formState?.repeatPassword?.error} />
                                </Flex>
                            </div>

                        </div>
                        <div className='table-item'>
                            <div className='column'>

                            </div>
                            <div className='column'>
                                <Button
                                    onClick={onSubmit}
                                    isLoading={btnLoading.isUpdateBtnLoading}
                                >
                                    비밀번호 변경
                                </Button>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default ChangePasswordForm