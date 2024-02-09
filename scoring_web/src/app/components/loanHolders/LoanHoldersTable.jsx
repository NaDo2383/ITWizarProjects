"use client";
import React, { useState, useEffect } from "react";
import CardMenu from "../card/CardMenu";
import Card from "../card";
import { MdCancel, MdCheckCircle, MdOutlineError } from "react-icons/md";

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import TablePagination from "../pagination/TablePagination"

function LoanHoldersTable(props) {
    const { tableData, totalElement, itemPerPage, setCurrentPage, currentPage } = props;
    const [sorting, setSorting] = useState([]);
    const { push } = useRouter();
    const columns = [
        columnHelper.accessor("id", {
            id: "id",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">
                    ID
                </p>
            ),
            cell: (info) => (
                <div className="flex items-center">
                    <p className="ml-3 text-[12px] font-bold text-navy-700 dark:text-white">
                        {info.getValue()}
                    </p>
                </div>
            ),
        }),
        columnHelper.accessor("custName", {
            id: "custName",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">
                    Нэр
                </p>
            ),
            cell: (info) => (
                <p className="text-[12px] font-bold text-navy-700 dark:text-white">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor("registerNo", {
            id: "registerNo",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">
                    РД
                </p>
            ),
            cell: (info) => (
                <p className="text-[12px] font-bold text-navy-700 dark:text-white">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor("education", {
            id: "education",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">
                    Боловсрол
                </p>
            ),
            cell: (info) => (
                <p className="text-[12px] font-bold text-navy-700 dark:text-white">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor("loanAmount", {
            id: "loanAmount",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">
                    Зээлийн дүн
                </p>
            ),
            cell: (info) => (
                <p className="text-[12px] font-bold text-navy-700 dark:text-white">
                    {info.getValue().toLocaleString()}
                </p>
            ),
        }),
        columnHelper.accessor("createdDate", {
            id: "createdDate",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">
                    Хүсэлт ирсэн огноо
                </p>
            ),
            cell: (info) => (
                <p className="text-[12px] font-bold text-navy-700 dark:text-white">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor("interest", {
            id: "interest",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">
                    Зээлийн хүү
                </p>
            ),
            cell: (info) => (
                <p className="text-[12px] font-bold text-navy-700 dark:text-white">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor("productName", {
            id: "productName",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">
                    Бүтээгдхүүн
                </p>
            ),
            cell: (info) => (
                <p className="text-[12px] font-bold text-navy-700 dark:text-white">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor("productPrice", {
            id: "productPrice",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">
                    Бүтээгдхүүний үнэ
                </p>
            ),
            cell: (info) => (
                <p className="text-[12px] font-bold text-navy-700 dark:text-white">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor("productType", {
            id: "productType",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">
                    Бүтээгдхүүний төрөл
                </p>
            ),
            cell: (info) => (
                <p className="text-[12px] font-bold text-navy-700 dark:text-white">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor("status", {
            id: "status",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">
                    Төлөв
                </p>
            ),
            cell: (info) => (
                <p className="text-[12px] font-bold text-navy-700 dark:text-white flex items-center">
                    {info.getValue() === "SUCCESS" ? (
                        <MdCheckCircle className="me-1 text-green-500 dark:text-green-300" />
                    ) : info.getValue() === "FAIL" ? (
                        <MdCancel className="me-1 text-red-500 dark:text-red-300" />
                    ) : info.getValue() === "ERROR" ? (
                        <MdOutlineError className="me-1 text-amber-500 dark:text-amber-300" />
                    ) : null}
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
        tableData && setData(tableData);
    }, [tableData]);

    return (
        <Card extra={"w-full h-full sm:overflow-auto px-6"}>
            <header className="relative flex items-center justify-between pt-4">
                <div className="text-xl font-bold text-navy-700 dark:text-white">
                    Скори бодуулах хүсэлтүүд
                </div>

                <CardMenu />
            </header>

            <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
                <table className="w-full">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr
                                key={headerGroup.id}
                                className="!border-px !border-gray-400"
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            onClick={header.column.getToggleSortingHandler()}
                                            className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
                                        >
                                            <div className="items-center justify-between text-xs text-gray-200">
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: "",
                                                    desc: "",
                                                }[
                                                    header.column.getIsSorted()
                                                ] ?? null}
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <tr
                                    key={row.id}
                                    className="cursor-pointer border-b border-b-gray-200 hover:border-b-gray-600 hover:border-b-2"
                                    onClick={() =>
                                        push(
                                            `/admin/loanholder/${row.original.id}`
                                        )
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <td
                                                key={cell.id}
                                                className="border-white/0 py-3  pr-4"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div>
                    <TablePagination
                        totalItems={totalElement}
                        itemsPerPage={itemPerPage}
                        onPageChange={setCurrentPage}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </Card>
    );
}

export default LoanHoldersTable;
const columnHelper = createColumnHelper();
