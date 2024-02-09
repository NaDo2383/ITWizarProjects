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

export default function SocialInsuranceTable(props) {
    const { tableData } = props;
    const [sorting, setSorting] = React.useState([]);
    const columns = [
        columnHelper.accessor('year1', {
            id: 'year1',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">Жил</p>
            ),
            cell: (info) => (
                <p className="text-[12px] min-w-[100px] font-bold text-navy-700 dark:text-white">
                    {info.getValue()} оны
                </p>
            ),
        }),
        columnHelper.accessor('month1', {
            id: 'month1',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">Сар</p>
            ),
            cell: (info) => (
                <p className="text-[12px]  font-bold text-navy-700 dark:text-white">
                    {info.getValue()} сар
                </p>
            ),
        }),
        columnHelper.accessor('salAmt', {
            id: 'salAmt',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">
                    Тооцсон дүн
                </p>
            ),
            cell: (info) => (
                <p className="text-[12px] min-w-[150px]  font-bold text-navy-700 dark:text-white">
                    {info.getValue().toLocaleString()}
                </p>
            ),
        }),
        columnHelper.accessor('salFee', {
            id: 'salFee',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">
                    Төлсөн татвар
                </p>
            ),
            cell: (info) => (
                <p className="text-[12px]  font-bold text-navy-700 dark:text-white">
                    {info.getValue().toLocaleString()}
                </p>
            ),
        }),
        columnHelper.accessor('cnt', {
            id: 'cnt',
            header: () => (
                <p className="text-sm font-bold w-[100px] text-gray-600 dark:text-white">Давхар төлөгдсөн эсэх</p>
            ),
            cell: (info) => (
                <p className={`text-[12px] w-[100px] font-bold ${info.getValue() === 2 && "text-green-600"}`}>
                    {info.getValue() === 2 ? "Тийм" : "Үгүй"}
                    {/* {info.getValue()} */}
                </p>
            ),
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
            <div className="overflow-x-auto xl:overflow-x-hidden mx-auto w-full">
                <header className="relative flex items-center justify-between p-4">
                    <div className="text-xl font-bold text-navy-700 dark:text-white">
                        Нийгмийн даатгал
                    </div>
                </header>
                <table className=" w-full">
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
                                    <tr key={row.id} className='border-b border-b-gray-200'>
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <td
                                                    key={cell.id}
                                                    className=" border-white/0 py-2  pr-4 text-center"
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