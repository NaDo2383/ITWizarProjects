import React, { createContext, useState, useRef, useContext } from 'react'

const UserContext = createContext({})

const UserProvider = ({ children }) => {
    const [userList, setUserList] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
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
