import React, { useState } from 'react'
import InputPassword from 'components/ui/form/elements/input/InputPassword'
import useForm from 'components/ui/form/store/useForm'
import { validateForm } from 'common/validation/validate'
import Button from 'components/ui/button/Button'
import { loginFormSchema } from './loginFormSchema'
import { useMetamaskCtx } from 'common/metamask/useMetamaskCtx'
import { useRouter } from 'next/navigation'
import useUser from '../useUser'
import useJwtAuth from '../auth/useJwtAuth'
import InputText from 'components/ui/form/elements/input/InputText'
import { useGlobalCtx } from 'common/global/useGlobalCtx'
import { useGlobalPopupCtx } from 'a/common/popup/globalPopups/useGlobalPopupCtx'
import { GLOBAL_POPUP_TYPES } from 'a/common/popup/globalPopups/globalPopupRegistration'
import { setTokenIntoCookie } from 'common/token/token'
import { useUserCtx } from '../useUserCtx'
import { Local } from 'libs/constants'
import FormRow from 'a/components/ui/form/FormRow'
import { Flex } from 'a/components/ui/containers/flex/Flex'
import { OutlineBtn } from 'a/components/ui/button/OutlineBtn'
import OutlineLink from 'a/components/ui/button/OutlineLink'
import { setLocal } from 'a/common/storage/localStorage'

const initialLoginState = {
    id: { value: null, error: null },
    password: { value: null, error: null },
}

function LoginForm() {
    const { push } = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const { connectMetaMask, wallet } = useMetamaskCtx()
    const { setAuthState } = useGlobalCtx()
    const { onChange, onError, formState } = useForm(initialLoginState)
    const { loginUser, loginWallet } = useJwtAuth()
    const { showGlobalPopup } = useGlobalPopupCtx()
    const { getUserInfo } = useUser()
    const { setUserInfo } = useUserCtx()

    const handleWalletLogin = async (e) => {
        e.preventDefault()
        if (wallet.accounts?.length > 0) {
            const walletAddress = wallet.accounts[0].toLowerCase()
            const res = await loginWallet(walletAddress)

            if (res.status === 200) {
                const token = res.data.token
                // const refreshToken = res.data.refreshToken
                setTokenIntoCookie(token)
                const infoRes = await getUserInfo(token)
                if (infoRes?.status === 200) {
                    setUserInfo(infoRes?.data?.result)
                    const userObj = {
                        login: res?.data?.result?.login,
                        name: infoRes?.data?.result?.name,
                        nickname: infoRes?.data?.result?.nickname,
                        token: res?.data?.result?.token,
                        refreshToken: res?.data?.result?.refreshToken,
                        walletAddress: res?.data?.result?.walletAddress,
                    }
                    // Properties to exclude
                    const propertiesToExclude = ['token', 'refreshToken']

                    // Create a new object excluding specified properties
                    const newObj = Object.fromEntries(
                        Object.entries(userObj).filter(
                            ([key]) => !propertiesToExclude.includes(key)
                        )
                    )
                    // setSessionCookie(CookieName.LOGGED_USER, userObj)
                    setLocal(Local.LOGGED_USER, newObj)
                    setAuthState(userObj)
                    push('/')
                }
            } else if (res.status === 404) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: '등록된 지갑 주소로 연결해 주세요.',
                })
                return
            } else {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: 'Something went wrong on server',
                })
                return
            }
        } else {
            showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                message: '메타마스크로 로그인 해주세요.',
            })
            connectMetaMask()
            return
        }
    }

    function handleGotoSignup(e) {
        e.preventDefault()
        push('/sign-up')
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        try {
            const loginData = {
                username: formState.id.value,
                password: formState.password.value,
            }

            const { success, errors } = await validateForm(loginFormSchema, formState)
            if (!success) {
                onError(errors)
                console.error('validation амжилтгүй', errors)
                return
            }
            const { success: isSuccessLogin } = await loginUser(loginData)
            if (isSuccessLogin) {
                push('/')
            }
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <form>
            <FormRow errMsg={formState?.id?.error}>
                <InputText
                    name={'id'}
                    onChange={onChange}
                    value={formState?.id?.value}
                    isValid={Boolean(formState?.id?.error)}
                    placeholder="아이디 입력"
                />
            </FormRow>
            <FormRow errMsg={formState?.password?.error}>
                <InputPassword
                    name={'password'}
                    onChange={onChange}
                    value={formState?.password?.value}
                    isValid={Boolean(formState?.password?.error)}
                    placeholder="비밀번호 입력 "
                />
            </FormRow>
            <FormRow>
                <Button onClick={handleSubmit} isLoading={isLoading} disabled={isLoading}>
                    로그인
                </Button>
            </FormRow>
            <FormRow>
                <OutlineLink href={'/reset-password'} className="text-center">
                    비밀번호를 잊으셨나요?
                </OutlineLink>
            </FormRow>
            <FormRow>
                <Flex gap={2} width="full">
                    <OutlineBtn onClick={handleWalletLogin}>지갑 연결하기</OutlineBtn>
                    <OutlineBtn onClick={handleGotoSignup}>회원 가입하기</OutlineBtn>
                </Flex>
            </FormRow>
        </form>
    )
}

export default LoginForm
