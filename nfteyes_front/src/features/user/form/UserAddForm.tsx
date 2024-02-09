import React from 'react'
import FormRow from 'components/ui/form/FormRow'
import InputText from 'components/ui/form/elements/input/InputText'
import useForm from 'components/ui/form/store/useForm'
import { TUser } from '../store/userReducer'
import useUser from '../store/useUser'
import { validateForm } from 'common/validation/validate'
import { userFormSchema } from '../store/user.schema'
import { TFormValue } from 'components/ui/form/store/formReducer'

type TUserFormState = {
    username: TFormValue
    email: TFormValue
    phone: TFormValue
    website: TFormValue
    address: TFormValue
    company: TFormValue
}

export const initialUserFormState: TUserFormState = {
    username: { value: null, error: null },
    email: { value: null, error: null },
    phone: { value: null, error: null },
    website: { value: null, error: null },
    address: { value: null, error: null },
    company: { value: null, error: null },
}
function UserAddForm() {
    const { onChange, formState, onError } = useForm<TUserFormState>(initialUserFormState)
    const { userState, addUser } = useUser()
    // console.log('formState', formState)

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        const newUser: TUser = {
            id: userState.users.length + 1,
            username: formState.username?.value!,
            email: formState.email?.value!,
            address: {
                street: formState.address?.value!,
                suite: 'new added suite',
                city: 'ub',
                zipcode: '976',
                geo: {
                    lat: '56',
                    lng: '65',
                },
            },
            phone: formState.phone?.value!,
            website: formState.website?.value!,
            company: {
                name: formState.company?.value!,
                catchPhrase: 'default phrase',
                bs: 'default bs',
            },
        }
        const { success, errors } = await validateForm(userFormSchema, formState)
        if (!success) {
            console.log('UserAddForm', errors)
            onError(errors)
        } else {
            await addUser(newUser)
            console.log('newUser', newUser)
        }
    }
    return (
        <form>
            <FormRow errMsg={formState?.username?.error!}>
                <label>name:</label>
                <InputText
                    name="username"
                    onChange={onChange}
                    value={formState?.username?.value!}
                    isValid={Boolean(formState?.username?.error)}
                />
            </FormRow>
            <FormRow errMsg={formState?.email?.error!}>
                <label>email:</label>
                <InputText
                    name="email"
                    onChange={onChange}
                    value={formState?.email?.value!}
                    isValid={Boolean(formState?.email?.error)}
                />
            </FormRow>
            <FormRow errMsg={formState?.address?.error!}>
                <label>address:</label>
                <InputText
                    name={'address'}
                    onChange={onChange}
                    value={formState?.address?.value!}
                    isValid={Boolean(formState?.address?.error)}
                />
            </FormRow>
            <FormRow errMsg={formState?.phone?.error!}>
                <label>phone:</label>
                <InputText
                    name={'phone'}
                    onChange={onChange}
                    value={formState.phone?.value!}
                    isValid={Boolean(formState?.phone?.error)}
                />
            </FormRow>
            <FormRow errMsg={formState?.website?.error!}>
                <label>website:</label>
                <InputText
                    name={'website'}
                    onChange={onChange}
                    value={formState.website?.value!}
                    isValid={Boolean(formState?.website?.error)}
                />
            </FormRow>
            <FormRow errMsg={formState?.company?.error!}>
                <label>company:</label>
                <InputText
                    name={'company'}
                    onChange={onChange}
                    value={formState.company?.value!}
                    isValid={Boolean(formState.company?.error!)}
                />
            </FormRow>
            <FormRow className="mt-10">
                <button onClick={onSubmit}>add </button>
            </FormRow>
        </form>
    )
}

export default UserAddForm
