import React from 'react'
import useUser from '../store/useUser'
import { TUserForm } from '../store/_types'
import { TUser } from '../store/userReducer'
import FormRow from 'components/ui/form/FormRow'
import useForm from 'components/ui/form/store/useForm'
import InputText from 'components/ui/form/elements/input/InputText'
import { validateForm } from 'common/validation/validate'
import { userFormSchema } from '../store/user.schema'

type TEditForm = Record<keyof TUserForm, { value: number | string; error: string | null }>

function UserEditForm({ userId }: { userId: number }): JSX.Element {
    const { editUser, getUserById, userState } = useUser()
    const { userDetail } = userState
    const initialUserFormData: TEditForm = {
        id: { value: userId, error: null },
        username: { value: userDetail?.username ?? '', error: null },
        email: { value: userDetail?.email ?? '', error: null },
        phone: { value: userDetail?.phone ?? '', error: null },
        website: { value: userDetail?.website ?? '', error: null },
        address: { value: userDetail?.address?.street ?? '', error: null },
        company: { value: userDetail?.company?.name ?? '', error: null },
    }

    const { onChange, formState, onError } = useForm<TEditForm>(initialUserFormData, { initCase: userDetail })

    console.log('userDetail', userDetail)
    console.log('userEditFormState: ', formState)
    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        const editedUser: TUser = {
            id: userId,
            username: formState?.username?.value || '',
            email: formState.email?.value || '',
            address: {
                street: formState?.address?.value || '',
                suite: userDetail?.address.suite || '',
                city: userDetail?.address.city || '',
                zipcode: userDetail?.address.zipcode || '',
                geo: {
                    lat: userDetail?.address.geo.lat || '',
                    lng: userDetail?.address.geo.lng || '',
                },
            },
            phone: formState.phone?.value || '',
            website: formState.website?.value || '',
            company: {
                name: formState.company?.value || '',
                catchPhrase: userDetail?.company.catchPhrase || '',
                bs: userDetail?.company.bs || '',
            },
        }
        const { success, errors } = await validateForm(userFormSchema, formState)
        if (!success) {
            onError(errors)
        } else {
            await editUser(editedUser)
            await getUserById(userId)
        }
    }

    return (
        <form>
            <FormRow>
                <label>Name:</label>
                <InputText
                    name={'username'}
                    onChange={onChange}
                    value={formState?.username?.value!}
                    isValid={Boolean(formState?.username?.error)}
                />
            </FormRow>
            <FormRow>
                <label>email:</label>
                <InputText
                    name={'email'}
                    onChange={onChange}
                    value={formState?.email?.value!}
                    isValid={Boolean(formState?.email?.error)}
                />
            </FormRow>
            <FormRow>
                <label>address:</label>
                <InputText
                    name={'address'}
                    onChange={onChange}
                    value={formState?.address?.value!}
                    isValid={Boolean(formState?.address?.error)}
                />
            </FormRow>
            <FormRow>
                <label>phone:</label>
                <InputText
                    name={'phone'}
                    onChange={onChange}
                    value={formState?.phone?.value!}
                    isValid={Boolean(formState?.phone?.error)}
                />
            </FormRow>
            <FormRow>
                <label>website:</label>
                <InputText
                    name={'website'}
                    onChange={onChange}
                    value={formState?.website?.value!}
                    isValid={Boolean(formState?.website?.error)}
                />
            </FormRow>
            <FormRow>
                <label>company:</label>
                <InputText
                    name={'company'}
                    onChange={onChange}
                    value={formState?.company?.value!}
                    isValid={Boolean(formState?.company?.error)}
                />
            </FormRow>
            <FormRow className="mt-10">
                <button onClick={onSubmit}>save</button>
            </FormRow>
        </form>
    )
}

export default UserEditForm
