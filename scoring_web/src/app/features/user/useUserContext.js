"use client"
import React, { createContext, useState, useContext } from "react"

const UserContext = createContext({})

const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null)
    return (
        <UserContext.Provider
            value={{
                userInfo,
                setUserInfo,
            }}>
            {children}
        </UserContext.Provider>
    )
}

const useUserCtx = () => {
    const context = useContext(UserContext)
    if (!context) throw new Error("useUserCtx must be used within a UserProvider")
    return context
}

export { UserContext, UserProvider, useUserCtx }
