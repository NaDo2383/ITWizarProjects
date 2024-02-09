import React from 'react'
import Card from '../card'

export default function InformationTable(props) {
    const { loanHolderDetail } = props
    return (
        <Card extra={'pb-10 p-4  mt-3 w-auto'}>
            <div className="overflow-x-auto xl:overflow-x-hidden flex flex-col justify-center mx-auto w-full">
                <header className="relative flex items-center justify-between p-4">
                    <div className="text-xl font-bold text-navy-700 dark:text-white">
                        Дэлгэрэнгүй мэдээлэл
                    </div>
                </header>
                <div className='flex gap-5 w-full'>
                    <div className='flex flex-col justify-between w-full'>
                        <header className="relative flex items-center justify-between p-4">
                            <div className=" font-bold text-navy-700 dark:text-white">
                                Зээлдэгч
                            </div>
                        </header>
                        <table className="w-full">

                            <tbody>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Овог
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.lastname}
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Нэр
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.firstname}
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Нас
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.age}
                                    </td>

                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        РД
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.registerNo}
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Боловсрол
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.education}
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Хүйс
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.gender}
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Утасны дугаар
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.phone}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <header className="relative flex items-center justify-between p-4">
                            <div className=" font-bold text-navy-700 dark:text-white">
                                Хаяг
                            </div>
                        </header>
                        <table className="w-full">

                            <tbody>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Орон байрны төрөл
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.homeType}
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Өмчлөлийн хэлбэр
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.ownershipType}
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Төрсөн аймаг
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.province}
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Иргэний бүртгэлийн хаяг
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.civilRegistAddr}
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Оршин суугаа хаяг
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.residentialAddr}
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Хаягийн зөрчил
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.addrViolation}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <header className="relative flex items-center justify-between p-4">
                            <div className=" font-bold text-navy-700 dark:text-white">
                                Ажлын байр
                            </div>
                        </header>
                        <table className="w-full">

                            <tbody>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Ажлын газар
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.workplace}
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Ажлын хаяг
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.workAddr}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <header className="relative flex items-center justify-between p-4">
                            <div className=" font-bold text-navy-700 dark:text-white">
                                НДШ
                            </div>
                        </header>
                        <table className="w-full">

                            <tbody>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Сүүлийн жилийн НДШ тасарсан сар
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.interruptedMonth}
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Сүүлийн байгууллагад ажилласан хугацаа
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.lastOrgPeriod}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='flex flex-col justify-between w-full'>
                        <header className="relative flex items-center justify-between p-4">
                            <div className=" font-bold text-navy-700 dark:text-white">
                                Бүтээгдхүүн
                            </div>
                        </header>
                        <table className="w-full">

                            <tbody>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Бүтээгдэхүүний нэр загвар
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.productName}
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Бүтээгдэхүүний төрөл
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.productType}
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Бүтээгдэхүүний үнэ
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {parseInt(loanHolderDetail?.productPrice)?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Зээлийн дүн
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.loanAmount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Зээлийн хүү
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.interest}%
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Зээлийн хугацаа /сар/
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.period}
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Сарын төлөлт
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.monthlyPayment?.toLocaleString()}
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Урьдчилгаа төлбөр
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.prePayment?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Давтан зээлдэгч эсэх
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.repeatBorrower}
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Хадгаламжтай эсэх
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.saving}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <header className="relative flex items-center justify-between p-4">
                            <div className=" font-bold text-navy-700 dark:text-white">
                                Орлого
                            </div>
                        </header>
                        <table className="w-full">

                            <tbody>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Сүүлийн жилийн нийт орлого
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.lastYearIncome?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <header className="relative flex items-center justify-between p-4">
                            <div className=" font-bold text-navy-700 dark:text-white">
                                Зээл
                            </div>
                        </header>
                        <table className="w-full">

                            <tbody>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Хар саарал жагсаалт
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.blacklist}
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Зээлийн түүх
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.loanHistory}
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Хэвийн зээлийн тоо
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.normalLoanCount}
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Хугацаа хэтэрсэн зээлийн тоо
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.overdueLoanCount}
                                    </td>

                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Зээлийн сарын төлөлт
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.monthlyLoanPayment?.toLocaleString()}
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Нийт зээлийн үлдэгдэл
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.balance?.toLocaleString()}
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-200'>
                                    <td className="min-w-[150px] text-[12px] border-white/0 py-2 pr-4 font-bold" >
                                        Чанаргүй зээлийн тоо
                                    </td>
                                    <td
                                        className="max-w-[150px] text-[12px] border-white/0 py-2  pr-4"
                                    >
                                        {loanHolderDetail?.badLoanCount}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Card>
    )
}
