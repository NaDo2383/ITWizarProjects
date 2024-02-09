import React, { useEffect } from 'react'
import useFetchData from 'common/fetch/useFetchData'
import { TUser } from 'features/user/store/userReducer'
import useUser from './store/useUser'
import { useUserCtx } from './store/useUserCtx'
import UserListItem from './UserListItem'
import { areEqual } from 'libs/utils/areEqual'

function UserList() {
    const users = useFetchData<TUser[]>('/users')
    const { setUserCtx } = useUser()
    const { userState } = useUserCtx()

    useEffect(() => {
        setUserCtx(users!)
    }, [users])

    console.log('UserList render hiilee', userState)

    return (
        <div className="border p-10">
            {userState.users?.map((user: TUser, idx: number) => <UserListItem key={'user-item-' + idx} {...user} />)}
        </div>
    )
}

export const UserListCached = React.memo(UserList, areEqual) // зарим тохиолдолд re-render хийгдэхгүй байгаа нь annoying болгож байна
export default UserList
