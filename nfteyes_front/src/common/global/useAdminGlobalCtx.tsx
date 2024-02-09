import React, { createContext, useState, useContext, FC } from 'react'
// import { JsxChildren } from '../types/common'

interface IAdminGlobalCtx {
    adminGlobalItems: any
    setAdminGlobalItems: React.Dispatch<React.SetStateAction<boolean>>
}

const AdminGlobalContext = createContext<IAdminGlobalCtx>({} as IAdminGlobalCtx)

const AdminGlobalProvider: FC<JsxChildren> = ({ children }) => {
    const [adminGlobalItems, setAdminGlobalItems] = useState<boolean>(false)

    return (
        <AdminGlobalContext.Provider
            value={{
                adminGlobalItems,
                setAdminGlobalItems,
            }}
        >
            {children}
        </AdminGlobalContext.Provider>
    )
}

const useAdminGlobalCtx = () => useContext(AdminGlobalContext)

export { AdminGlobalContext, AdminGlobalProvider, useAdminGlobalCtx }
