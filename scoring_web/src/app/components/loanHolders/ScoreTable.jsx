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

export default function ScoreTable(props) {
    const { tableData, footerData } = props;
    const [sorting, setSorting] = React.useState([]);
    const columns = [
        columnHelper.accessor('cd', {
            id: 'cd',
            header: () => (
                <p className="text-sm font-bold text-gray-600 min-w-[150px] max-w-[250px] dark:text-white">Скоринг зардаргаа</p>
            ),
            cell: (info) => (
                <p className="text-[12px] text-left  font-bold text-navy-700 dark:text-white min-w-[150px] max-w-[250px] break-words">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor('point', {
            id: 'point',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">Авсан оноо</p>
            ),
            cell: (info) => (
                <p className="text-[12px]  font-bold text-navy-700 dark:text-white">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor('maxPoint', {
            id: 'maxPoint',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white break-words">
                    Боломжит дээд оноо
                </p>
            ),
            cell: (info) => (
                <p className="text-[12px]  font-bold text-navy-700 dark:text-white">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor('difference', {
            id: 'difference',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">
                    Алдсан оноо
                </p>
            ),
            cell: (info) => (
                <p className="text-[12px] font-bold text-navy-700 dark:text-white">
                    {info.getValue()}
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
            <div className="overflow-x-auto xl:overflow-x-hidden">
                <header className="relative flex items-center justify-between p-4">
                    <div className="text-xl font-bold text-navy-700 dark:text-white">
                        Скоринг үзүүлэлтүүд
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
                                    <tr key={row.id} className='border-b border-b-gray-200'>
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
                        <tr className='border-t !border-gray-400'>
                            <td className="min-w-[150px] border-white/0 py-3  pr-4 text-center" >
                                <p className='text-sm font-bold text-gray-900 dark:text-white min-w-[150px] max-w-[250px]'>
                                    Нийт
                                </p>
                            </td>
                            <td className="min-w-[100px] border-white/0 py-3  pr-4 text-center" >
                                <p className='text-sm font-bold text-gray-900 dark:text-white'>
                                    {footerData?.point}
                                </p>
                            </td>
                            <td className="min-w-[100px] border-white/0 py-3  pr-4 text-center" >
                                <p className='text-sm font-bold text-gray-900 dark:text-white'>
                                    {footerData?.maxPoint}
                                </p>
                            </td>
                            <td className="min-w-[100px] border-white/0 py-3  pr-4 text-center" >
                                <p className='text-sm font-bold text-gray-900 dark:text-white'>
                                    {footerData?.difference}
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
const columnHelper = createColumnHelper();