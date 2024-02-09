import React from 'react'
import { ITable } from './Table'
import Pagination from '../pagination/Pagination'
import Flex from '../containers/flex/Flex'

function TableUi({ children, noPagination }: ITable) {
    function onChange(page: number) {
        console.log(page)
    }
    return (
        <Flex className="flex-col w-full">
            <div className="table-wrapper">
                <div className="w-full overflow-x-auto">
                    <table>{children}</table>
                </div>
            </div>
            {!noPagination && <Pagination totalItems={100} itemsPerPage={10} currentPage={1} onChange={onChange} />}
        </Flex>
    )
}

export default TableUi
