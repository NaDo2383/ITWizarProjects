import React from 'react'
import { TableProvider } from './useTableCtx'
import TableUi from './TableUi'

export interface ITable extends JsxChildren {
    noPagination?: boolean
}
function Table({ children, noPagination }: ITable) {
    return (
        <TableProvider>
            <TableUi noPagination={noPagination}>{children}</TableUi>
        </TableProvider>
    )
}

export default Table
