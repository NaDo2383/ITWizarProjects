export type TCompany = {
    name: string
    catchPhrase: string
    bs: string
}

export type TAddress = {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
        lat: string
        lng: string
    }
}

export type TUser = {
    id: number
    username: string
    email: string
    address: TAddress
    phone: string
    website: string
    company: TCompany
    status?: string
}
export type TUserState = {
    users: TUser[]
    userDetail: TUser | null
}

export type TUserAction =
    | {
          type: 'SET'
          payload: TUser[]
      }
    | {
          type: 'ADD'
          payload: TUser
      }
    | {
          type: 'EDIT'
          payload: TUser
      }
    | {
          type: 'DELETE'
          payload: number
      }
    | {
          type: 'GET'
      }
    | {
          type: 'GET_BY_ID'
          payload: number
      }

export function userReducer(state: TUserState, action: TUserAction): TUserState {
    const { users } = state
    const { type } = action
    switch (type) {
        case 'SET':
            console.info('dispatched:: USERS_SET')
            return {
                ...state,
                users: action.payload,
            }
        case 'ADD':
            console.info('dispatched:: USER_ADD')
            return {
                ...state,
                users: [...users, action.payload],
            }
        case 'EDIT':
            console.info('dispatched:: USER_EDIT')
            const userToUpdate = users.find((user) => user.id === action.payload.id)
            if (!userToUpdate) return state

            const updatedUsers: TUser[] = users.map((user) => (user.id === userToUpdate.id ? action.payload : user))

            return {
                ...state,
                users: updatedUsers,
            }
        case 'DELETE':
            console.info('dispatched:: USER_DELETE')
            const filteredUsers: TUser[] = users.filter((user) => user.id !== action.payload)
            return {
                ...state,
                users: filteredUsers,
            }
        case 'GET':
            console.info('dispatched:: USERS_GET')
            return {
                ...state,
            }
        case 'GET_BY_ID':
            console.info('dispatched:: USER_GET')
            const userById = users.find((user) => user.id === action.payload)
            return {
                ...state,
                userDetail: userById || null,
            }
        default:
            return state
    }
}
