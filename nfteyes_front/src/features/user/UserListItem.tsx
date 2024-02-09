import Flex from 'components/ui/containers/flex/Flex'
import React from 'react'
import { TUser } from './store/userReducer'
import useUser from './store/useUser'
import { areEqual } from 'libs/utils/areEqual'
import { useGlobalPopupCtx } from 'common/popup/globalPopups/useGlobalPopupCtx'
import { GLOBAL_POPUP_TYPES } from 'common/popup/globalPopups/globalPopupRegistration'
function UserListItem({ username, id }: TUser) {
    const { getUserById, deleteUser } = useUser()
    const { showGlobalPopup, setGlobalPopupState } = useGlobalPopupCtx()
    console.log('UserListItem render hiilee')

    async function handleDelete() {
        showGlobalPopup(GLOBAL_POPUP_TYPES.DECISION, {
            message: 'Та үүнийг устгахдаа итгэлтэй байна уу?',
            ok: async () => await deleteUser(id),
        })
        setGlobalPopupState((prev: any) => ({
            ...prev,
        }))
        // await deleteUser(id)
    }
    return (
        <Flex gap={20} between className="py-5">
            <h5>{username}</h5>
            <Flex gap={10}>
                <button onClick={async () => await getUserById(id)}>detail</button>
                <button onClick={handleDelete}>delete</button>
            </Flex>
        </Flex>
    )
}

export const UserListItemCached = React.memo(UserListItem, areEqual) // зарим тохиолдолд re-render хийгдэхгүй байгаа нь annoying болгож байна
export default UserListItem
