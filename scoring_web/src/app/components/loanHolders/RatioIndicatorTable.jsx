import React from 'react'
import Card from '../../components/card';

export default function RatioIndicatorTable(props) {
    const { loanHolderDetail } = props
    return (
        <Card extra={'pb-10 p-4 mt-3 w-auto'}>
            <div className="overflow-x-auto xl:overflow-x-hidden flex flex-col justify-center ">
                <header className="relative flex items-center justify-between p-4">
                    <div className="text-xl font-bold text-navy-700 dark:text-white">
                        Үндсэн харьцаа үзүүлэлтүүд
                    </div>
                </header>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30">
                                <div className="items-center justify-between text-xs text-gray-400">
                                    ҮНДСЭН ХАРЬЦАА ҮЗҮҮЛЭЛТ
                                </div>
                            </th>
                            <th className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30">
                                <div className="items-center justify-between text-xs text-gray-400">
                                    Харьцаа
                                </div>
                            </th>
                            <th className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30">
                                <div className="items-center justify-between text-xs text-gray-400">
                                    Үр дүн
                                </div>
                            </th>
                            <th className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30">
                                <div className="items-center justify-between text-xs text-gray-400">
                                    Шаардлага
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='border-b border-b-gray-200'>
                            <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                Барьцаа хөрөнгөөр зээл барагдуулах харьцаа
                            </td>
                            <td
                                className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                            >
                                {loanHolderDetail?.ratioIndicator?.collateralLoanPaymentRatio}%
                            </td>
                            <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4" >
                                {loanHolderDetail?.ratioIndicator?.collateralLoanPaymentResult.toFixed(2)}%
                            </td>
                            <td
                                className="max-w-[250px] text-[12px] border-white/0 py-2  pr-4"
                            >
                                {loanHolderDetail?.ratioIndicator?.collateralLoanPaymentResult >= 100 ? "Шаардлага хангасан" : "100%-иас бага байж болохгүй!!!"}
                            </td>

                        </tr>
                        <tr className='border-b border-b-gray-200'>
                            <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                Өөрийн орлогоор зээл барагдуулах харьцаа
                            </td>
                            <td
                                className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                            >
                                {loanHolderDetail?.ratioIndicator?.ownIncomeLoanPaymentRatio}%
                            </td>
                            <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4" >
                                {(loanHolderDetail?.ratioIndicator?.ownIncomeLoanPaymentResult)?.toFixed(2)}%
                            </td>
                            <td
                                className="max-w-[250px] text-[12px] border-white/0 py-2  pr-4"
                            >
                                {loanHolderDetail?.ratioIndicator?.ownIncomeLoanPaymentResult >= loanHolderDetail?.ratioIndicator?.ownIncomeLoanPaymentRatio ? "Шаардлага хангасан" : `${loanHolderDetail?.ratioIndicator?.ownIncomeLoanPaymentRatio}%-с бага байж болохгүй`}
                            </td>
                        </tr>
                        <tr className='border-b border-b-gray-200'>
                            <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                Одоогийн орлого зээлийн төлбөрийн харьцаа
                            </td>
                            <td
                                className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                            >
                                {loanHolderDetail?.ratioIndicator?.currIncomeLoanPaymentRatio}%
                            </td>
                            <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4" >
                                {(loanHolderDetail?.ratioIndicator?.currIncomeLoanPaymentResult)?.toFixed(2)}%
                            </td>
                            <td
                                className="max-w-[250px] text-[12px] border-white/0 py-2  pr-4"
                            >
                                {loanHolderDetail?.ratioIndicator?.currIncomeLoanPaymentResult <= loanHolderDetail?.ratioIndicator?.currIncomeLoanPaymentRatio ? "Шаардлага хангасан" : `${loanHolderDetail?.ratioIndicator?.currIncomeLoanPaymentRatio}%-с хэтэрч болохгүй`}
                            </td>
                        </tr>
                        <tr className='border-b border-b-gray-200'>
                            <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                Өр орлогын харьцаа
                            </td>
                            <td
                                className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                            >
                                {loanHolderDetail?.ratioIndicator?.debtIncomeRatio}%
                            </td>
                            <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4" >
                                {(loanHolderDetail?.ratioIndicator?.debtIncomeResult)?.toFixed(2)}%
                            </td>
                            <td
                                className="max-w-[250px] text-[12px] border-white/0 py-2  pr-4"
                            >
                                {loanHolderDetail?.ratioIndicator?.debtIncomeRatio >= loanHolderDetail?.ratioIndicator?.debtIncomeResult ? "Шаардлага хангасан" : `${loanHolderDetail?.ratioIndicator?.debtIncomeRatio}%-с хэтэрч болохгүй`}
                            </td>
                        </tr>
                        <tr className='border-b border-b-gray-200'>
                            <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                Зээлдэгчийн скоринг оноо
                            </td>
                            <td
                                className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                            >
                                {loanHolderDetail?.ratioIndicator?.score}
                            </td>
                            <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                {loanHolderDetail?.ratioIndicator?.scoreResult}
                            </td>
                            <td
                                className="max-w-[250px] text-[12px] border-white/0 py-2  pr-4"
                            >
                                {loanHolderDetail?.ratioIndicator?.scoreResult >= 89 ? "А эрсдэл маш бага" : loanHolderDetail?.ratioIndicator?.scoreResult >= 79 ? "В эрдсэл бага" : loanHolderDetail?.ratioIndicator?.scoreResult >= 69 ? " С эрсдэл дунд зэрэг" : loanHolderDetail?.ratioIndicator?.scoreResult >= 60 ? "D эрсдэл дунджаас их" : "F эрдсэл өндөртэй"}
                            </td>
                        </tr>
                        <tr className='border-b border-b-gray-200'>
                            <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                Зээл өгөх боломжтой эсэх
                            </td>
                            <td></td>
                            <td
                                className={`text-[12px] border-white/0 py-2  pr-4 text-center ${loanHolderDetail?.ratioIndicator?.status === "POSSIBLE" ? "text-green-600" : loanHolderDetail?.ratioIndicator?.status === "QUESTIONABLE" ? "text-orange-600" : "text-red-600"}  font-bold`}
                            >
                                {loanHolderDetail?.ratioIndicator?.status === "POSSIBLE" ? "БОЛОМЖТОЙ" : loanHolderDetail?.ratioIndicator?.status === "QUESTIONABLE" ? "ЭРГЭЛЗЭЭТЭЙ" : "БОЛОМЖГҮЙ"}
                            </td>
                            <td></td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    )
}
