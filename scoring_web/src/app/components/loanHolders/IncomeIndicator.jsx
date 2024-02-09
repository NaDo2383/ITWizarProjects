import React from 'react'
import Card from '../../components/card';

export default function IncomeIndicator(props) {
    const { incomeIndicator } = props
    return (
        <Card extra={'pb-10 p-4 mt-3 w-auto'}>
            <div className="overflow-x-auto xl:overflow-x-hidden flex flex-col justify-center ">
                <header className="relative flex items-center justify-between p-4">
                    <div className="text-xl font-bold text-navy-700 dark:text-white">
                        Орлогын үзүүлэлтүүд
                    </div>
                </header>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30">
                                <div className="items-center justify-between text-xs text-gray-400">
                                    Үзүүлэлтийн нэр
                                </div>
                            </th>
                            <th className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30">
                                <div className="items-center justify-between text-xs text-gray-400">
                                    Үзүүлэлт
                                </div>
                            </th>
                            <th className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30">
                                <div className="items-center justify-between text-xs text-gray-400">
                                    Үзүүлэлтийн нэр
                                </div>
                            </th>
                            <th className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30">
                                <div className="items-center justify-between text-xs text-gray-400">
                                    Үзүүлэлт
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='border-b border-b-gray-200'>
                            <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                Дундаж цалин
                            </td>
                            <td
                                className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                            >
                                {incomeIndicator?.averageIncome?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                Шимтгэл
                            </td>
                            <td
                                className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                            >
                                {incomeIndicator?.averageFee?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                        </tr>
                        <tr className='border-b border-b-gray-200'>
                            <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                Гарт олгох цалин
                            </td>
                            <td
                                className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                            >
                                {incomeIndicator?.incomeHand?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                Орлогын нийт дүн
                            </td>
                            <td
                                className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                            >
                                {incomeIndicator?.totalIncome?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                        </tr>
                        <tr className='border-b border-b-gray-200'>
                            <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                Зээл төлөх орлогын хувь
                            </td>
                            <td
                                className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                            >
                                {incomeIndicator?.interest.toFixed(1)}%
                            </td>
                            <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                НДШ тасарсан сар
                            </td>
                            <td
                                className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                            >
                                {incomeIndicator?.interruptedMonth}
                            </td>
                        </tr>
                        <tr className='border-b border-b-gray-200'>
                            <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                Сайн дураар төлсөн эсэх
                            </td>
                            <td
                                className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                            >
                                {incomeIndicator?.unforcedPaid}
                            </td>
                            <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                Ажилласан компаний тоо
                            </td>
                            <td
                                className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                            >
                                {incomeIndicator?.orgCount}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    )
}
