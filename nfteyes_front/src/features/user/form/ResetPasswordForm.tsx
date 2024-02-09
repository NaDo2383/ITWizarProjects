import Flex from 'components/ui/containers/flex/Flex'
import FormRow from 'components/ui/form/FormRow'
import InputText from 'components/ui/form/elements/input/InputText'
import { Label } from 'components/ui/typography/typography-utils'
import { Button, SecondaryButton } from 'components/ui/button/Button'
import { SmallWrapper } from 'components/ui/containers/Wrapper'
import { useRouter } from 'next/navigation'
import useForm from 'components/ui/form/store/useForm'
import { validateForm } from 'common/validation/validate'
import { resetPasswordFormSchema } from './resetPasswordFormSchema'
import useJwtAuth from 'common/auth/jwt/useJwtAuth'

const initialResetPasswordState = {
    id: { value: null, error: null },
}

function ResetPasswordForm() {
    const { onChange, onError, formState } = useForm(initialResetPasswordState)
    const { requestResetPassword } = useJwtAuth()

    async function handleSubmit(e: any) {
        e.preventDefault()

        try {
            const { success, errors } = await validateForm(resetPasswordFormSchema, formState)
            if (!success) {
                onError(errors)
                return
            }

            const res: any = await requestResetPassword(formState?.id?.value)
            console.log('res: ', res)

            if (res.success) {
                push('/reset-password/confirm-email')
            }
        } catch (e) {
            console.error(e)
        }
    }

    const { push } = useRouter()
    return (
        <form>
            <h1 className="text-center">Find my password</h1>
            <Flex className="flex-col gap-10 text-center pb-50">
                <p className="text-24">Lost your password?</p>
                <p className="text-24">Please enter your ID(email address).</p>
                <p className="text-24">You will receive a link to create a new password via email</p>
            </Flex>
            <SmallWrapper>
                <FormRow className="gap-3" errMsg={null}>
                    <Label>ID (E-mail)</Label>
                    <InputText
                        name={'id'}
                        value={formState?.id?.value!}
                        onChange={onChange}
                        isValid={Boolean(formState?.id?.error)}
                    />
                </FormRow>
                <Flex className="gap-20 pt-5 pb-20">
                    <SecondaryButton>Cancel</SecondaryButton>
                    <Button onClick={handleSubmit}>Reset password</Button>
                </Flex>
            </SmallWrapper>
        </form>
    )
}

export default ResetPasswordForm
