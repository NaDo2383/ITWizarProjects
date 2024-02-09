"use client"
import React, { useEffect, useState } from 'react'
import useApiConnections from '../../features/connections/useApiConnections'
import { useGlobalCtx } from '../../common/global/useGlobalCtx';
import LoanHoldersTable from "../../components/loanHolders/LoanHoldersTable"

export default function LoanHolders() {
    const { getLoanHoldersData } = useApiConnections();
    const { loanHoldersData } = useGlobalCtx()
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElement, setTotalElement] = useState(1);
    const itemPerPage = 10;

    useEffect(() => {
        getLoanHoldersData({ size: itemPerPage, page: currentPage }).then((res) => {
            setTotalElement(res.totalElements)
        });
    }, [currentPage])


    return (
        <div>
            <LoanHoldersTable tableData={loanHoldersData?.content} totalElement={totalElement} itemPerPage={itemPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </div>
    )
}
