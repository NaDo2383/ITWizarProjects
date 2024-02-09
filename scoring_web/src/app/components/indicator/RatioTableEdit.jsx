import React, { useState, useEffect } from 'react';
import Card from '../card';
import useForm from '../../common/form/useForm';
import InputFieldWithValue from '../fields/InputFieldWithValue';
import useApiConnections from '../../features/connections/useApiConnections';
import { ratioDataSchema } from './ratioDataSchema'
import { validateForm } from '../../common/validation/validate';


export default function RatioTableEdit(props) {
    const { tableData, setIsEditting } = props;
    const { editRatioData } = useApiConnections()
    const [formInitialState, setFormInitialState] = useState({
        collateralLoanPaymentRatio: {
            value: tableData?.collateralLoanPaymentRatio,
            error: null
        },
        currIncomeLoanPaymentRatio: {
            value: tableData?.currIncomeLoanPaymentRatio,
            error: null
        },
        ownIncomeLoanPaymentRatio: {
            value: tableData?.ownIncomeLoanPaymentRatio,
            error: null
        },
        debtIncomeRatio: {
            value: tableData?.debtIncomeRatio,
            error: null
        },
        score: {
            value: tableData?.score,
            error: null
        },
        month: {
            value: tableData?.month,
            error: null
        },
    })

    const { formState, onChange } = useForm(formInitialState)

    const handleClick = async () => {
        const payload = {
            collateralLoanPaymentRatio: formState.collateralLoanPaymentRatio.value,
            ownIncomeLoanPaymentRatio: formState.ownIncomeLoanPaymentRatio.value,
            currIncomeLoanPaymentRatio: formState.currIncomeLoanPaymentRatio.value,
            debtIncomeRatio: formState.debtIncomeRatio.value,
            score: formState.score.value,
            month: formState.month.value
        }

        const { success, errors } = await validateForm(
            ratioDataSchema,
            formState
        )

        if (!success) {
            alert(Object.values(errors)[0])
            return
        }
        const res = await editRatioData(payload)
        if (res.data.message === "Амжилттай") {
            setIsEditting(false)
            alert("Амжилттай хадгалагдлаа")
        } else {
            alert("Хадгалхад алдаа гарлаа")
        }
    }


    return (
        <Card extra={'pb-10 p-4  h-full'}>
            <div className=" overflow-x-scroll xl:overflow-x-hidden ">
                <header className="relative flex items-center justify-end p-4">
                    <button onClick={() => handleClick()} className='linear px-4 rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200'>
                        Хадгалах
                    </button>
                </header>
                <table className="w-full">
                    <tbody>
                        <tr className=' flex items-center gap-4'>
                            <td className="border-b border-b-gray-200 min-w-[150px] text-[12px] border-white/0 py-3 pr-4 font-bold w-full" >
                                Барьцаа хөрөнгөөр зээл барагдуулах харьцаа
                            </td>
                            <td
                                className="max-w-[60px] text-[12px] border-white/0  pr-4"
                            >
                                <InputFieldWithValue
                                    id='collateralLoanPaymentRatio'
                                    type='number'
                                    name="collateralLoanPaymentRatio"
                                    onChange={onChange}
                                    value={formState?.collateralLoanPaymentRatio?.value}
                                />
                            </td>
                        </tr>
                        <tr className=' flex items-center gap-4'>
                            <td className="border-b border-b-gray-200 min-w-[150px] text-[12px] border-white/0 py-3 pr-4 font-bold w-full" >
                                Одоогийн орлого зээлийн төлбөрийн харьцаа
                            </td>
                            <td
                                className="max-w-[60px] text-[12px] border-white/0  pr-4"
                            >
                                <InputFieldWithValue
                                    id='currIncomeLoanPaymentRatio'
                                    type='number'
                                    name="currIncomeLoanPaymentRatio"
                                    onChange={onChange}
                                    value={formState?.currIncomeLoanPaymentRatio?.value}
                                />
                            </td>
                        </tr>
                        <tr className=' flex items-center gap-4'>
                            <td className="border-b border-b-gray-200 min-w-[150px] text-[12px] border-white/0 py-3 pr-4 font-bold w-full" >
                                Өр орлогын харьцаа
                            </td>
                            <td
                                className="max-w-[60px] text-[12px] border-white/0  pr-4"
                            >
                                <InputFieldWithValue
                                    id='debtIncomeRatio'
                                    type='number'
                                    name="debtIncomeRatio"
                                    onChange={onChange}
                                    value={formState?.debtIncomeRatio?.value}
                                />
                            </td>
                        </tr>
                        <tr className=' flex items-center gap-4'>
                            <td className="border-b border-b-gray-200 min-w-[150px] text-[12px] border-white/0 py-3 pr-4 font-bold w-full" >
                                Өөрийн орлогоор зээл барагдуулах харьцаа
                            </td>
                            <td
                                className="max-w-[60px] text-[12px] border-white/0  pr-4"
                            >
                                <InputFieldWithValue
                                    id='ownIncomeLoanPaymentRatio'
                                    type='number'
                                    name="ownIncomeLoanPaymentRatio"
                                    onChange={onChange}
                                    value={formState?.ownIncomeLoanPaymentRatio?.value}
                                />
                            </td>
                        </tr>
                        <tr className=' flex items-center gap-4'>
                            <td className="border-b border-b-gray-200 min-w-[150px] text-[12px] border-white/0 py-3 pr-4 font-bold w-full" >
                                Зээлдэгчийн скоринг оноо
                            </td>
                            <td
                                className="max-w-[60px] text-[12px] border-white/0  pr-4"
                            >
                                <InputFieldWithValue
                                    id='score'
                                    type='number'
                                    name="score"
                                    onChange={onChange}
                                    value={formState?.score?.value}
                                />
                            </td>
                        </tr>
                        <tr className=' flex items-center gap-4'>
                            <td className="border-b border-b-gray-200 min-w-[150px] text-[12px] border-white/0 py-3 pr-4 font-bold w-full" >
                                Скоринг хугацаа/сараар/
                            </td>
                            <td
                                className="max-w-[60px] text-[12px] border-white/0  pr-4"
                            >
                                <InputFieldWithValue
                                    id='month'
                                    type='number'
                                    name="month"
                                    onChange={onChange}
                                    value={formState?.month?.value}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    );
}