import React, { useEffect, useState } from 'react'
import FormRow from 'components/ui/form/FormRow'
import InputEmail from 'components/ui/form/elements/input/InputEmail'
import InputPassword from 'components/ui/form/elements/input/InputPassword'
import InputText from 'components/ui/form/elements/input/InputText'
import { SecondaryButton, Button } from 'components/ui/button/Button'
import { Label, PinkParagraph } from 'components/ui/typography/typography-utils'
import Flex from 'components/ui/containers/flex/Flex'
import useForm from 'components/ui/form/store/useForm'
import useUser from '../useUser'
import { useSiteGlobalCtx } from 'common/global/useSiteGlobalCtx'
import { TFormValue } from 'components/ui/form/store/formReducer'
import { validateForm } from 'common/validation/validate'
import { accountSettingFormSchema } from './accountSettingFormSchema'
type TAccountSettingFormState = {
    email: TFormValue
    nickname: TFormValue
    oldPassword: TFormValue
    newPassword: TFormValue
    newPasswordConfirm: TFormValue
}

function AccountSettingForm() {
    const [isLoading, setIsLoading] = useState(false)
    const { authState } = useSiteGlobalCtx()
    const { updateNickName, updatePassword } = useUser()
    const [initialAccountFormData, setInitialAccountFormData] = useState<TAccountSettingFormState | null>(null)
    console.log('authState', authState)
    useEffect(() => {
        const initialFormTimer = setTimeout(() => {
            if (authState) {
                setInitialAccountFormData({
                    email: { value: authState.username!, error: null },
                    nickname: { value: authState.nickname!, error: null },
                    oldPassword: { value: null, error: null },
                    newPassword: { value: null, error: null },
                    newPasswordConfirm: { value: null, error: null },
                })
            }
        }, 500)
        return () => clearTimeout(initialFormTimer)
    }, [authState])

    const { onChange, onError, formState, setErrorField } = useForm<TAccountSettingFormState>(initialAccountFormData!)

    console.log('formState', formState)

    async function handleUpdateNickName(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)
        try {
            let nickname = formState?.nickname?.value ?? ''

            if (nickname === '') {
                return
            }

            const res = await updateNickName(nickname)
            console.log('res', res)
            if (res.success) {
                alert('nickname saved')
            }

            if (res?.statusCode === 400) {
                alert('please insert nickname!')
            }
            if (res?.statusCode === 500) {
                alert('internall server error')
            }
        } finally {
            setIsLoading(false)
        }
    }

    async function handleUpdatePassword(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)
        try {
            const oldPassword = formState?.oldPassword?.value!
            const newPassword = formState?.newPassword?.value!
            const newPasswordConfirm = formState?.newPasswordConfirm?.value!

            const { success, errors } = await validateForm(accountSettingFormSchema, formState)
            if (!success) {
                onError(errors)
                console.error('validation амжилтгүй', errors)
                return
            }

            if (newPassword !== newPasswordConfirm) {
                setErrorField('newPasswordConfirm', 'password does not match!')
                return
            }

            const res = await updatePassword(oldPassword, newPassword)
            console.log('res', res)
            if (res?.message === 'password.not.match') {
                setErrorField('oldPassword', 'The PW does not match')
                return
            }
            if (res.success) {
                alert('password changed!')
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form className={`${isLoading ? ' pointer-events-none' : 'pointer-events-auto'}`}>
            <FormRow>
                <Label>ID(E-mail)</Label>
                <InputEmail name="email" placeholder={authState?.username} disabled />
            </FormRow>
            <FormRow>
                <Label>Nickname</Label>
                <Flex className="flex-row gap-15">
                    <InputText
                        name="nickname"
                        onChange={onChange}
                        value={formState?.nickname?.value!}
                        isValid={Boolean(formState?.nickname?.error)}
                    />
                    <SecondaryButton className="max-w-[80px]" onClick={handleUpdateNickName}>
                        Save
                    </SecondaryButton>
                </Flex>
            </FormRow>
            <FormRow>
                <h2 className="text-[#DDDDDD]">Change password</h2>
                <Flex className="flex-col gap-15">
                    <PinkParagraph>
                        For a secure usage, please generate information excluding easily traceable details such as
                        birthdate and phone number.
                    </PinkParagraph>
                    <PinkParagraph>
                        You cannot use special characters other than ~!@#$%^*. Please create a password with a minimum
                        of 8 characters, including ENGLISH letters, numbers, and special characters.
                    </PinkParagraph>
                </Flex>
            </FormRow>
            <FormRow errMsg={formState?.oldPassword?.error}>
                <Label>Present PW</Label>
                <InputPassword
                    name="oldPassword"
                    onChange={onChange}
                    value={formState?.oldPassword?.value!}
                    isValid={Boolean(formState?.oldPassword?.error)}
                />
                {/* <span className="text-darkPurple text-20">The PW does not match</span> */}
            </FormRow>
            <FormRow errMsg={formState?.newPassword?.error}>
                <Label>New PW</Label>
                <InputPassword
                    name="newPassword"
                    onChange={onChange}
                    value={formState?.newPassword?.value!}
                    isValid={Boolean(formState?.newPassword?.error)}
                />
            </FormRow>
            <FormRow errMsg={formState?.newPasswordConfirm?.error}>
                <Label>Re-enter New PW</Label>
                <InputPassword
                    name="newPasswordConfirm"
                    onChange={onChange}
                    value={formState?.newPasswordConfirm?.value!}
                    isValid={Boolean(formState?.newPasswordConfirm?.error)}
                />
            </FormRow>
            <Button isLoading={isLoading} onClick={handleUpdatePassword} className=" font-abelRegular">
                Save
            </Button>
        </form>
    )
}

export default AccountSettingForm
