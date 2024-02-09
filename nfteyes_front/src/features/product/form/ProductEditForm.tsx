import React from 'react'
import useProduct from '../store/useProduct'
import { TProductForm } from '../store/_types'
import { TProduct } from '../store/productReducer'
import FormRow from 'components/ui/form/FormRow'
import useForm from 'components/ui/form/store/useForm'
import InputText from 'components/ui/form/elements/input/InputText'
import { validateForm } from 'common/validation/validate'
import { productFormSchema } from '../store/product.schema'

type TEditForm = Record<keyof TProductForm, { value: string | number; error: string | null }>

function UserEditForm({ productId }: { productId: number }): JSX.Element {
    const { editProduct, getProductById, productState } = useProduct()
    const { productDetail } = productState
    const initialUserFormData: TEditForm = {
        id: {
            value: productId,
            error: null,
        },
        name: {
            value: productDetail?.name ?? '',
            error: null,
        },
        code: {
            value: productDetail?.code ?? '',
            error: null,
        },
        initialPrice: {
            value: productDetail?.initialPrice ?? '',
            error: null,
        },
        price: {
            value: productDetail?.price ?? '',
            error: null,
        },
    }

    const { onChange, formState, onError } = useForm<TEditForm>(initialUserFormData, { initCase: productDetail })

    console.log('productDetail', productDetail)
    console.log('userEditFormState: ', formState)
    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        const editedUser: TProduct = {
            id: productId,
            name: formState?.name?.value || '',
            code: formState?.code.value || '',
            initialPrice: formState?.initialPrice.value || '',
            price: formState?.price.value || '',
            author: '',
            video_length: '',
            description: '',
            purchaseCount: 0,
            lessonCount: 0,
            categoryId: 0,
            adminId: 0,
        }
        const { success, errors } = await validateForm(productFormSchema, formState)
        if (!success) {
            onError(errors)
        } else {
            await editProduct(editedUser)
            await getProductById(productId)
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
