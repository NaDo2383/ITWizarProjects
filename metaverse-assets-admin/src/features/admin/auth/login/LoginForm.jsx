import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LabelArea from '@/components/ui/form/selectOption/LabelArea';
import InputEmail from '@/components/ui/form/elements/input/InputEmail';
import useForm from '@/components/ui/form/store/useForm';
import Btn from '@/components/ui/button/Button';
import { validateForm } from '@/common/validation/validate';
import { loginFormSchema } from './loginFormSchema';
import InputPassword from '@/components/ui/form/elements/input/InputPassword';
import FormRow from '@/components/ui/form/FormRow';
import AdminServices from '../../AdminServices';
import { useGlobalCtx } from '@/common/global/useGlobalCtx';
import { useGlobalPopupCtx } from '@/common/popup/globalPopups/useGlobalPopupCtx';
import { GLOBAL_POPUP_TYPES } from '@/common/popup/globalPopups/globalPopupRegistration';
import { CookieName } from '@/libs/constants';

const initialLoginState = {
    email: { value: null, error: null },
    password: { value: null, error: null },
};

function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const { onChange, onError, formState } = useForm(initialLoginState);
    const { authState, setAuthState } = useGlobalCtx();
    const { showGlobalPopup } = useGlobalPopupCtx();
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const loginData = {
                username: formState.email.value.trim(),
                password: formState.password.value.trim(),
            };

            const { success, errors } = await validateForm(loginFormSchema, formState);
            if (!success) {
                onError(errors);
                console.error('validation амжилтгүй', errors);
                return;
            }
            const res = await AdminServices.loginAdmin(loginData);

            if (res?.result) {
                const authState = {
                    ...res?.result,
                    token: res?.token,
                };
                setAuthState(authState);
                history.push('/');
                return;
            }
            if (res?.status === 400) {
                console.error('res?.code', res?.code);
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: 'Not registered user!',
                });
            } else {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: '아이디 또는 비밀번호가 일치하지 않습니다.',
                });
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form>
            <FormRow errMsg={formState?.email?.error}>
                <LabelArea label='Email' />
                <InputEmail
                    name='email'
                    onChange={onChange}
                    value={formState?.email?.value}
                    isValid={Boolean(formState?.email?.error)}
                    placeholder='이메일 입력'
                />
            </FormRow>
            <FormRow errMsg={formState?.password?.error}>
                <LabelArea label='Password' />
                <InputPassword
                    name='password'
                    onChange={onChange}
                    value={formState?.password?.value}
                    isValid={Boolean(formState?.password?.error)}
                    placeholder='비밀번호 입력 '
                />
            </FormRow>
            <div className='mt-5'>
                <Btn disabled={isLoading} isLoading={isLoading} onClick={handleSubmit}>
                    Login
                </Btn>
            </div>
            <hr className='my-10' />
        </form>
    );
}

export default LoginForm;
