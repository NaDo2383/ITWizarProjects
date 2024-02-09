import React, { createContext, useState, useContext, FC } from 'react'

interface ITableCtx {
    tableType: any
    setTableType: React.Dispatch<React.SetStateAction<any>>
}

const TableContext = createContext<ITableCtx>({} as ITableCtx)

const TableProvider: FC<JsxChildren> = ({ children }) => {
    const [tableType, setTableType] = useState<any>(null)

    return (
        <TableContext.Provider
            value={{
                tableType,
                setTableType,
            }}
        >
            {children}
        </TableContext.Provider>
    )
}

const useTableCtx = () => {
    const context = useContext(TableContext)
    if (!context) throw new Error('useTableCtx must be used within a TableProvider')
    return context
}

export { TableContext, TableProvider, useTableCtx }
