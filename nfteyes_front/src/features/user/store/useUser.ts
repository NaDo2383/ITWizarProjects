import { useUserCtx } from './useUserCtx'
import { TUser } from './userReducer'

function useUser() {
    const { userState, userDispatch } = useUserCtx()

    function setUserCtx(users: TUser[]): void {
        userDispatch({ type: 'SET', payload: users })
    }

    async function addUser(user: TUser): Promise<void> {
        userDispatch({ type: 'ADD', payload: user })
    }

    async function editUser(editedUser: TUser): Promise<TUser | undefined> {
        userDispatch({ type: 'EDIT', payload: editedUser })
        return userState.users.find((user: TUser) => user.id === editedUser.id)
    }

    async function deleteUser(id: number): Promise<void> {
        userDispatch({ type: 'DELETE', payload: id })
    }

    async function getUsers(): Promise<TUser[]> {
        userDispatch({ type: 'GET' })
        return userState.users
    }

    async function getUserById(id: number): Promise<TUser | null> {
        userDispatch({ type: 'GET_BY_ID', payload: id })
        return userState.userDetail
    }

    return {
        setUserCtx,
        addUser,
        getUsers,
        getUserById,
        editUser,
        deleteUser,
        userState,
    }
}

export default useUser
