import React, { useState } from 'react'
import { useUserCtx } from './store/useUserCtx'
import UserEditForm from './form/UserEditForm'
import { FormProvider } from 'components/ui/form/store/useFormCtx'

function UserDetail(): JSX.Element {
    const { userState } = useUserCtx()
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const { userDetail } = userState

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
                userDetail ? (
                    <FormProvider>
                        <UserEditForm userId={userDetail?.id!} />
                    </FormProvider>
                ) : (
                    <p>user сонгоно уу!</p>
                )
            ) : (
                <>
                    <h5>name: {userDetail?.username}</h5>
                    <h5>email: {userDetail?.email}</h5>
                    <h5>address: {userDetail?.address.street}</h5>
                    <h5>phone: {userDetail?.phone}</h5>
                    <h5>website: {userDetail?.website}</h5>
                    <h5>company: {userDetail?.company.name}</h5>
                </>
            )}
            <button onClick={handleEdit}>{isEdit ? 'back' : 'edit'}</button>
        </div>
    )
}

export default UserDetail
