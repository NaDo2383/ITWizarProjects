import React, { useState, useEffect } from 'react';
import Card from '../card';
import CardMenu from '../card/CardMenu';

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';

export default function ZmsTable(props) {
    const { tableData } = props;
    const [sorting, setSorting] = React.useState([]);
    const columns = [
        columnHelper.accessor('loanType', {
            id: 'loanType',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">Төрөл</p>
            ),
            cell: (info) => (
                <p className="text-[12px]  font-bold text-navy-700 dark:text-white">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor('currency', {
            id: 'currency',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">Валют</p>
            ),
            cell: (info) => (
                <p className="text-[12px]  font-bold text-navy-700 dark:text-white">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor('advAmount', {
            id: 'advAmount',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white break-words max-w-[120px]">
                    Анх олгосон зээлийн хэмжээ
                </p>
            ),
            cell: (info) => (
                <p className="text-[12px]  font-bold text-navy-700 dark:text-white">
                    {info.getValue().toLocaleString()}
                </p>
            ),
        }),
        columnHelper.accessor('interest', {
            id: 'interest',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white break-words max-w-[70px]">
                    Зээлийн хүү
                </p>
            ),
            cell: (info) => (
                <p className="text-[12px]  font-bold text-navy-700 dark:text-white">
                    {info.getValue()}%
                </p>
            ),
        }),
        columnHelper.accessor('startDate', {
            id: 'startDate',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white break-words max-w-[70px]">Олгосон огноо</p>
            ),
            cell: (info) => (
                <p className="text-[12px] font-bold text-navy-700 dark:text-white min-w-[88px]">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor('expDate', {
            id: 'expDate',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white break-words max-w-[70px]">төлөгдөх огноо</p>
            ),
            cell: (info) => (
                <p className="text-[12px] font-bold text-navy-700 dark:text-white min-w-[88px]">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor('balance', {
            id: 'balance',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white break-words max-w-[120px]">Үндсэн зээлийн үлдэгдэл</p>
            ),
            cell: (info) => (
                <p className="text-[12px] font-bold text-navy-700 dark:text-white">
                    {info.getValue().toLocaleString()}
                </p>
            ),
        }),
        columnHelper.accessor('loanClass', {
            id: 'loanClass',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">Ангилал</p>
            ),
            cell: (info) => (
                <p className="text-[12px] font-bold text-navy-700 dark:text-white">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor('monthlyPayment', {
            id: 'monthlyPayment',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">Сарын төлөлт</p>
            ),
            cell: (info) => (
                <p className="text-[12px] font-bold text-navy-700 dark:text-white">
                    {info.getValue().toLocaleString()}
                </p>
            )
        }),
    ]; // eslint-disable-next-line
    const [data, setData] = useState([]);
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    });

    useEffect(() => {
        tableData && setData(tableData)
    }, [tableData])

    return (
        <Card extra={'pb-10 p-4 mt-3 '}>
            <div className="overflow-x-auto xl:overflow-x-hidden">
                <header className="relative flex items-center justify-between p-4">
                    <div className="text-xl font-bold text-navy-700 dark:text-white">
                        Зээлийн мэдээллийн сангийн лавлагаа
                    </div>
                </header>
                <table className="w-full">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="!border-px !border-gray-400">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            onClick={header.column.getToggleSortingHandler()}
                                            className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-center dark:border-white/30"
                                        >
                                            <div className="items-center justify-between text-xs text-gray-200">
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )}
                                                {{
                                                    asc: '',
                                                    desc: '',
                                                }[header.column.getIsSorted()] ?? null}
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table
                            .getRowModel()
                            .rows
                            .map((row) => {
                                return (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <td
                                                    key={cell.id}
                                                    className="border-white/0 py-2  pr-4 text-center"
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext(),
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
const columnHelper = createColumnHelper();