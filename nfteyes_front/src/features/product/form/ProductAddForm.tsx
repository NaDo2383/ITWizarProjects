import React from 'react'
import FormRow from 'components/ui/form/FormRow'
import InputText from 'components/ui/form/elements/input/InputText'
import useForm from 'components/ui/form/store/useForm'
import { TProduct } from '../store/productReducer'
import useProduct from '../store/useProduct'
import { validateForm } from 'common/validation/validate'
import { productFormSchema } from '../store/product.schema'
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
    const { productState, addProduct } = useProduct()
    // console.log('formState', formState)

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        const newProduct: TProduct = {
            id: productState.products.result.length + 1,
            name: formState.username?.value!,
            code: '123',
            initialPrice: 120,
            price: 1230,
            author: 'phillanderson',
            video_length: '1 hour 27 minut',
            description: 'lorem ipsum ',
            purchaseCount: 10,
            lessonCount: 20,
            categoryId: 0,
            adminId: 0,
        }
        const { success, errors } = await validateForm(productFormSchema, formState)
        if (!success) {
            console.log('UserAddForm', errors)
            onError(errors)
        } else {
            await addProduct(newProduct)
            console.log('newProduct', newProduct)
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
