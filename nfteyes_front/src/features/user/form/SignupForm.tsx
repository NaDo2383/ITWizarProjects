import React, { useEffect, useState } from 'react'
import InputText from 'components/ui/form/elements/input/InputText'
import useForm from 'components/ui/form/store/useForm'
import { Button } from 'components/ui/button/Button'
import InputPassword from 'components/ui/form/elements/input/InputPassword'
// import InputEmail from 'components/ui/form/elements/input/InputEmail'
import { validateForm } from 'common/validation/validate'
import { signupFormSchema } from './signupFormSchema'
import { useRouter } from 'next/router'
import Flex from 'components/ui/containers/flex/Flex'
import useJwtAuth from 'common/auth/jwt/useJwtAuth'
import { useGlobalPopupCtx } from 'common/popup/globalPopups/useGlobalPopupCtx'
import { GLOBAL_POPUP_TYPES } from 'common/popup/globalPopups/globalPopupRegistration'
import FormRow from 'components/ui/form/FormRow'
// import Select1 from 'components/ui/form/elements/select/_choices/select1/Select1'
import tw from 'tailwind-styled-components'
import { Label, PinkParagraph } from 'components/ui/typography/typography-utils'
import { useSiteGlobalCtx } from 'common/global/useSiteGlobalCtx'

const initialSignUpState = {
    username: { value: null, error: null },
    password: { value: null, error: null },
    passwordConfirm: { value: null, error: null },
    emailType: { value: null, error: null },
}

function SignupForm() {
    const { push } = useRouter()
    const { showGlobalPopup } = useGlobalPopupCtx()
    const [btnLoading, setBtnLoading] = useState({
        isCheckIdBtnLoading: false,
        isCheckMailBtnLoading: false,
        isSignUpBtnLoading: false,
    })

    const { onChange, onError, formState, resetFormField, setErrorField } = useForm(initialSignUpState)
    const { signUpUser } = useJwtAuth()
    const { setRegisteringMail } = useSiteGlobalCtx()

    async function handleSubmit(e: any) {
        e.preventDefault()
        setBtnLoading((prev) => ({
            ...prev,
            isSignUpBtnLoading: true,
        }))

        try {
            if (formState?.password?.value !== formState?.checkPassword?.value) {
                resetFormField('checkPassword')
                setErrorField('checkPassword', "Those password didn't match. Try again")
                return
            }
            const theEmail = formState?.username?.value + '@' + formState?.emailType?.value

            const payload = {
                username: theEmail,
                password: formState?.password?.value,
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

            const res: any = await signUpUser(payload)
            console.log('res: ', res)

            if (res.success) {
                setRegisteringMail(theEmail)
                push('/register/completed')
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
        }
    }, [formState?.password?.error])

    return (
        <form>
            <FormRow errMsg={formState?.username?.error} className={`gap-3`}>
                <Label className="">ID (E-mail)</Label>
                <Flex className="gap-10 items-center">
                    <InputText
                        name={'username'}
                        onChange={onChange}
                        value={formState?.username?.value!}
                        isValid={Boolean(formState?.username?.error)}
                        placeholder="nfteyes"
                    />
                    <span>@</span>
                    <InputText
                        name={'emailType'}
                        onChange={onChange}
                        value={formState?.emailType?.value!}
                        isValid={Boolean(formState?.username?.error)}
                    />
                </Flex>
            </FormRow>
            <FormRow className={`gap-3 pb-10`}>
                <Label>Password</Label>
                <InputPassword
                    name={'password'}
                    onChange={onChange}
                    value={formState?.password?.value!}
                    isValid={Boolean(formState?.password?.error)}
                />
            </FormRow>
            <FormRow>
                <PinkParagraph>
                    For a secure usage, please generate information excluding easily traceable details such as birthdate
                    and phone number.
                </PinkParagraph>
            </FormRow>
            <FormRow>
                <PinkParagraph>
                    You cannot use special characters other than ~!@#$%^*. Please create a password with a minimum of 8
                    characters, including ENGLISH letters, numbers, and special characters.
                </PinkParagraph>
            </FormRow>
            {/* <Layer isallow={isIdChecked.toString()} style={{ marginBottom: '30px' }}> */}

            <FormRow errMsg={formState?.checkPassword?.error} className={`gap-3`}>
                <Label>Re-enter new password</Label>
                <InputPassword
                    name={'checkPassword'}
                    onChange={onChange}
                    value={formState?.checkPassword?.value!}
                    isValid={Boolean(formState?.checkPassword?.error)}
                />
            </FormRow>
            <FormRow className={`gap-1 pt-2`}>
                <Button
                    onClick={handleSubmit}
                    isLoading={btnLoading.isCheckMailBtnLoading}
                    disabled={btnLoading.isCheckMailBtnLoading}
                >
                    Next
                </Button>
            </FormRow>
            {/* </Layer>     */}
        </form>
    )
}

export const SpanWarning = tw.div`
    text-[#668ccf]
`

interface ILayerTw extends React.ComponentProps<'div'> {
    isallow: string
}

export const Layer = tw.div<ILayerTw>`
  ${(p) => (p.isallow === 'true' ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-50')}
`
export const VerifyLayer = tw.div`
    ${(p: any) => (p.isallow === 'true' ? 'pointer-events-auto' : 'pointer-events-none')}
`

export default SignupForm
