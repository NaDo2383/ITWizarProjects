import React, { useState } from 'react'
import { useProductCtx } from './store/useProductCtx'
import ProductEditForm from './form/ProductEditForm'
import { FormProvider } from 'components/ui/form/store/useFormCtx'

function UserDetail(): JSX.Element {
    const { productState } = useProductCtx()
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const { productDetail } = productState

    async function handleEdit() {
        setIsEdit((prev) => !prev)
        if (isEdit) {
            console.log('edit function run')
        } else {
            console.log('back')
        }
    }
    return (
        <div className="flex flex-col gap-10 min-w-[200px] p-10 border">
            {isEdit ? (
                productDetail ? (
                    <FormProvider>
                        <ProductEditForm productId={productDetail?.id!} />
                    </FormProvider>
                ) : (
                    <p>product сонгоно уу!</p>
                )
            ) : (
                <>
                    <h5>name: {productDetail?.id}</h5>
                    <h5>email: {productDetail?.name}</h5>
                    <h5>address: {productDetail?.price}</h5>
                    <h5>phone: {productDetail?.author}</h5>
                    <h5>website: {productDetail?.code}</h5>
                    <h5>company: {productDetail?.description}</h5>
                </>
            )}
            <button onClick={handleEdit}>{isEdit ? 'back' : 'edit'}</button>
        </div>
    )
}

export default UserDetail
