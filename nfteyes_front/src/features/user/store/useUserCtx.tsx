import React, { createContext, useReducer, useContext, FC, Dispatch } from 'react'
import { TUserState, TUserAction, userReducer } from './userReducer'

interface IUserCtx {
    userState: TUserState
    userDispatch: Dispatch<TUserAction>
}

const UserContext = createContext<IUserCtx>({} as IUserCtx)

const initialUserState: TUserState = {
    users: [],
    userDetail: null,
}

const UserProvider: FC<JsxChildren> = ({ children }) => {
    const [userState, userDispatch] = useReducer(userReducer, initialUserState)

    return (
        <UserContext.Provider
            value={{
                userState,
                userDispatch,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

const useUserCtx = () => useContext(UserContext)

export { UserContext, UserProvider, useUserCtx }
