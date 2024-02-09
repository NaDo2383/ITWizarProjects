import React from "react";
import InputEmail from "@/components/ui/form/elements/input/InputEmail";
import InputPassword from "@/components/ui/form/elements/input/InputPassword";
import Link from "next/link";
import useForm from "@/components/ui/form/store/useForm";
import OutlineLink from "@/components/ui/button/OutlineLink";
import { validateForm } from "@/common/validation/validate";
import Button from "@/components/ui/button/Button";
import { loginFormSchema } from "./loginFormSchema";
import FieldError from "@/components/ui/form/FieldError";
import { useMetamaskCtx } from "@/common/metamask/useMetamaskCtx";
import styled from "styled-components";
import { useRouter } from "next/router";
import useUser from "../useUser";
import useJwtAuth from "../auth/useJwtAuth";
import InputText from "@/components/ui/form/elements/input/InputText";
import { useGlobalCtx } from "@/common/global/useGlobalCtx";
import { useGlobalPopupCtx } from "@/common/popup/useGlobalPopupCtx";
import { GLOBAL_POPUP_TYPES } from "@/common/popup/globalPopupRegistration";
import { setSessionCookie } from "@/common/storage/cookieStorage";
import { setRefreshTokenIntoCookie, setTokenIntoCookie } from "@/common/token/token";
import { useUserCtx } from "../useUserCtx";
import { CookieName } from "@/libs/constants";

const initialLoginState = {
    id: { value: null, error: null },
    password: { value: null, error: null },
};

function LoginForm() {
    const { push } = useRouter();
    const { connectMetaMask, wallet } = useMetamaskCtx();
    const { authUser, setAuthState } = useGlobalCtx()
    const { onChange, onError, formState, setErrorField } = useForm(initialLoginState);
    const { loginUser, loginWallet } = useJwtAuth()
    const { showGlobalPopup } = useGlobalPopupCtx()
    const { getUserInfo } = useUser()
    const { setUserInfo } = useUserCtx();

    const handleLinkWallet = async () => {
        if (!window.ethereum) {
            const installMetamask = window.confirm("Pls install metamask")
            if (installMetamask) {
                window.open(
                    "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                )
            }
            return
        }
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        })

        if (accounts.length > 0) {
            const walletAddress = accounts[0].toLowerCase();
            const res = await loginWallet(walletAddress)
            if (!res.data.login) {
                return
            }
            const token = res.data.token
            const refreshToken = res.data.refreshToken

            setTokenIntoCookie(token)
            setRefreshTokenIntoCookie(refreshToken)
            const infoRes = await getUserInfo(token)
            if (infoRes.status === 200) {
                setUserInfo(infoRes.data);
                const userObj = {
                    login: res.data.login,
                    name: infoRes.data.name,
                    nickname: infoRes.data.nickname,
                    token: res.data.token,
                    refreshToken: res.data.refreshToken
                }
                setSessionCookie(CookieName.LOGGED_USER, userObj)
                setAuthState(userObj)
                push("/");
            }
        } else {
            showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, { message: 'Please login metamask!' })
            return
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();

        const loginData = {
            id: formState.id.value,
            password: formState.password.value,

        };

        const { success, errors } = await validateForm(
            loginFormSchema,
            formState
        );
        if (!success) {
            onError(errors);
            console.error("validation амжилтгүй", errors);
            return
        }
        const { success: isSuccessLogin } = await loginUser(loginData)

        if (isSuccessLogin) {
            push('/');
        }
    }
    return (
        <>
            <div className="col-md-12">
                <div className="heading-section-1">
                    <h2 className="tf-title pb-16">Login</h2>
                </div>
            </div>
            <div className="col-12">
                <div className="widget-login">
                    <form id="commentform" className="comment-form">
                        <fieldset className="email">
                            <label>아이디 *</label>
                            {/* <InputEmail
                                name={"email"}
                                onChange={onChange}
                                value={formState?.email?.value}
                                isValid={Boolean(formState?.email?.error)}
                                placeholder="아이디 입력"
                            /> */}
                            <InputText
                                name={"id"}
                                onChange={onChange}
                                value={formState?.id?.value}
                                isValid={Boolean(formState?.id?.error)}
                                placeholder="아이디 입력"
                            />
                            <FieldError text={formState?.id?.error} />
                        </fieldset>
                        <fieldset className="password">
                            <label>비밀번호 *</label>
                            <InputPassword
                                name={"password"}
                                onChange={onChange}
                                value={formState?.password?.value}
                                isValid={Boolean(formState?.password?.error)}
                                placeholder="비밀번호 입력 "
                            />
                            <FieldError text={formState?.password?.error} />
                            <div className="forget-password">
                                <Link href="/reset-password">
                                    비밀번호를 잊으셨나요?
                                </Link>
                            </div>
                        </fieldset>
                        <Button onClick={handleSubmit}>
                            로그인
                            <i className="icon-arrow-up-right2" />
                        </Button>
                    </form>
                    <div className="other">또는</div>
                    <div className="login-other">
                        <MetamaskBtn onClick={() => handleLinkWallet()}>
                            지갑 연결하기
                        </MetamaskBtn>
                        <OutlineLink href={"/sign-up"}>회원 가입하기 </OutlineLink>
                    </div>
                </div>
            </div>
        </>
    );
}

const MetamaskBtn = styled.div`
    width: 100%;
    height: 50px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    padding: 10px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 800;
    line-height: 19px;
    text-transform: capitalize;
    cursor: pointer;
`;

export default LoginForm;
