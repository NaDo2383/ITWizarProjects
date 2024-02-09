import React, { useState, useEffect } from 'react';
import Card from '../card';


export default function RatioTable(props) {
    const { tableData, setIsEditting } = props;


    return (
        <Card extra={'pb-10 p-4  h-full'}>
            <div className=" overflow-x-scroll xl:overflow-x-hidden ">
                <header className="relative flex items-center justify-end p-4">
                    <button onClick={() => setIsEditting(true)} className='linear px-4 rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200'>
                        Засах
                    </button>
                </header>
                <table className="w-full">
                    <tbody>
                        <tr className='border-b border-b-gray-200'>
                            <td className="min-w-[150px] text-[12px] border-white/0 py-3 pr-4 font-bold" >
                                Барьцаа хөрөнгөөр зээл барагдуулах харьцаа
                            </td>
                            <td
                                className="max-w-[150px] text-[12px] border-white/0 py-3  pr-4"
                            >
                                {tableData?.collateralLoanPaymentRatio}
                            </td>
                        </tr>
                        <tr className='border-b border-b-gray-200'>
                            <td className="min-w-[150px] text-[12px] border-white/0 py-3 pr-4 font-bold" >
                                Одоогийн орлого зээлийн төлбөрийн харьцаа
                            </td>
                            <td
                                className="max-w-[150px] text-[12px] border-white/0 py-3  pr-4"
                            >
                                {tableData?.currIncomeLoanPaymentRatio}
                            </td>
                        </tr>
                        <tr className='border-b border-b-gray-200'>
                            <td className="min-w-[150px] text-[12px] border-white/0 py-3 pr-4 font-bold" >
                                Өр орлогын харьцаа
                            </td>
                            <td
                                className="max-w-[150px] text-[12px] border-white/0 py-3  pr-4"
                            >
                                {tableData?.debtIncomeRatio}
                            </td>
                        </tr>
                        <tr className='border-b border-b-gray-200'>
                            <td className="min-w-[150px] text-[12px] border-white/0 py-3 pr-4 font-bold" >
                                Өөрийн орлогоор зээл барагдуулах харьцаа
                            </td>
                            <td
                                className="max-w-[150px] text-[12px] border-white/0 py-3  pr-4"
                            >
                                {tableData?.ownIncomeLoanPaymentRatio}
                            </td>
                        </tr>
                        <tr className='border-b border-b-gray-200'>
                            <td className="min-w-[150px] text-[12px] border-white/0 py-3 pr-4 font-bold" >
                                Зээлдэгчийн скоринг оноо
                            </td>
                            <td
                                className="max-w-[150px] text-[12px] border-white/0 py-3  pr-4"
                            >
                                {tableData?.score}
                            </td>
                        </tr>
                        <tr className='border-b border-b-gray-200'>
                            <td className="min-w-[150px] text-[12px] border-white/0 py-3 pr-4 font-bold" >
                                Скоринг хугацаа/сараар/
                            </td>
                            <td
                                className="max-w-[150px] text-[12px] border-white/0 py-3  pr-4"
                            >
                                {tableData?.month}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    );
}