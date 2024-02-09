import React, { createContext, useState, useRef, useContext, FC } from 'react'

interface IUserCCtx {
    userList: any
    userInfo: any
    setUserList: React.Dispatch<React.SetStateAction<any>>
    setUserInfo: React.Dispatch<React.SetStateAction<any>>
    scrollRef: React.MutableRefObject<{ scrollPos: number }>
}
const UserContext = createContext<IUserCCtx>({} as IUserCCtx)

const UserProvider: FC<JsxChildren> = ({ children }) => {
    const [userList, setUserList] = useState<any>(null)
    const [userInfo, setUserInfo] = useState<any>(null)
    const scrollRef = useRef({
        scrollPos: 0,
    })
    return (
        <UserContext.Provider
            value={{
                userList,
                setUserList,
                userInfo,
                setUserInfo,
                scrollRef,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

const useUserCtx = () => {
    const context = useContext(UserContext)
    if (!context) throw new Error('useUserCtx must be used within a UserProvider')
    return context
}

export { UserContext, UserProvider, useUserCtx }
