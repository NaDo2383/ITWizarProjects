'use client'
import React, { useState, useEffect } from 'react';
import Card from '../card';
import InputFieldWithValue from '../fields/InputFieldWithValue';
import useForm from '../../common/form/useForm';
import useApiConnections from '../../features/connections/useApiConnections';
import { formulaDataSchema } from './formuldaDataSchema';
import { validateForm } from '../../common/validation/validate';

export default function FormulaTable(props) {
    const { tableData } = props;
    const [edittingRowId, setEdittingRowId] = useState(null)
    const [formInitialState, setFormInitialState] = useState({
        value: {
            value: null,
            error: null
        },
        point: {
            value: null,
            error: null
        },
        beginValue: {
            value: null,
            error: null
        },
        endValue: {
            value: null,
            error: null
        },
    })
    const { editFormulaData } = useApiConnections()

    useEffect(() => {
        if (edittingRowId) {
            const tempObj = tableData.find((el) => el.id === edittingRowId)
            setFormInitialState({
                value: {
                    value: tempObj.value,
                    error: null
                },
                point: {
                    value: tempObj.point,
                    error: null
                },
                beginValue: {
                    value: tempObj.beginValue,
                    error: null
                },
                endValue: {
                    value: tempObj.endValue,
                    error: null
                },
            })
        }
    }, [edittingRowId])

    const { formState, onChange } = useForm(formInitialState)

    const handleClick = async (id) => {
        const payload = {
            value: formState.value.value,
            point: formState.point.value,
            beginValue: formState.beginValue.value,
            endValue: formState.endValue.value
        }

        const { success, errors } = await validateForm(
            formulaDataSchema,
            formState
        )

        if (!success) {
            alert(Object.values(errors)[0])
            return
        }


        const res = await editFormulaData(id, payload)

        if (res.data.message === "Амжилттай") {
            setEdittingRowId(null)
            alert("Амжилттай хадгалагдлаа")
        } else {
            alert("Хадгалхад алдаа гарлаа")
        }

    }

    return (
        <Card extra={'pb-10 p-4 h-full'}>
            <div className="overflow-x-scroll xl:overflow-x-hidden">
                <header className="relative flex items-center justify-between p-4">
                    <div className="text-xl font-bold text-navy-700 dark:text-white">
                        Үндсэн Харьцаа Үзүүлэлт
                    </div>
                </header>
                <table className="w-full">
                    <thead>
                        <tr className="!border-px !border-gray-400">
                            <th className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30">
                                <p className="text-sm font-bold text-gray-600 dark:text-white">
                                    Үзүүлэлтийн нэр
                                </p>
                            </th>
                            <th className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30">
                                <p className="text-sm font-bold text-gray-600 dark:text-white">
                                    Утга
                                </p>
                            </th>
                            <th className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30">
                                <p className="text-sm font-bold text-gray-600 dark:text-white">
                                    Оноо
                                </p>
                            </th>
                            <th className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30">
                                <p className="text-sm font-bold text-gray-600 dark:text-white">
                                    Эхлэх утга
                                </p>
                            </th>
                            <th className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30">
                                <p className="text-sm font-bold text-gray-600 dark:text-white">
                                    Дуусах утга
                                </p>
                            </th>
                            <th className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30">
                                <p className="text-sm font-bold text-gray-600 dark:text-white">
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableData?.length > 0 && tableData?.map((data, index) => (
                                edittingRowId === data.id ?
                                    <tr key={index} >
                                        <td className="border-white/0 py-3  pr-4" >
                                            <p className="text-[12px]  font-bold text-navy-700 dark:text-white">
                                                {data.fname}
                                            </p>
                                        </td>
                                        <td
                                            className="max-w-[60px] text-[12px] border-white/0  pr-4"
                                        >
                                            <InputFieldWithValue
                                                id='value'
                                                type='string'
                                                name="value"
                                                onChange={onChange}
                                                value={formState?.value?.value}
                                            />
                                        </td>
                                        <td
                                            className="max-w-[60px] text-[12px] border-white/0  pr-4"
                                        >
                                            <InputFieldWithValue
                                                id='point'
                                                type='number'
                                                name="point"
                                                onChange={onChange}
                                                value={formState?.point?.value}
                                            />
                                        </td>
                                        <td
                                            className="max-w-[60px] text-[12px] border-white/0  pr-4"
                                        >
                                            <InputFieldWithValue
                                                id='beginValue'
                                                type='number'
                                                name="beginValue"
                                                onChange={onChange}
                                                value={formState?.beginValue?.value}
                                            />
                                        </td>
                                        <td
                                            className="max-w-[60px] text-[12px] border-white/0  pr-4"
                                        >
                                            <InputFieldWithValue
                                                id='endValue'
                                                type='number'
                                                name="endValue"
                                                onChange={onChange}
                                                value={formState?.endValue?.value}
                                            />
                                        </td>
                                        <td className="border-white/0 py-3  pr-4" >
                                            <button onClick={() => handleClick(data.id)} className='linear px-4 rounded-xl bg-brand-500 py-1 text-[12px] font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200'>
                                                Хадгалах
                                            </button>
                                        </td>
                                    </tr>
                                    :
                                    <tr key={index} >
                                        <td className="border-white/0 py-3  pr-4" >
                                            <p className="text-[12px]  font-bold text-navy-700 dark:text-white">
                                                {data.fname}
                                            </p>
                                        </td>
                                        <td className="border-white/0 py-3  pr-4" >
                                            <p className="text-[12px]  font-bold text-navy-700 dark:text-white">
                                                {data.value}
                                            </p>
                                        </td>
                                        <td className="border-white/0 py-3  pr-4" >
                                            <p className="text-[12px]  font-bold text-navy-700 dark:text-white">
                                                {data.point}
                                            </p>
                                        </td>
                                        <td className="border-white/0 py-3  pr-4" >
                                            <p className="text-[12px]  font-bold text-navy-700 dark:text-white">
                                                {data.beginValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                            </p>
                                        </td>
                                        <td className="border-white/0 py-3  pr-4" >
                                            <p className="text-[12px]  font-bold text-navy-700 dark:text-white">
                                                {data.endValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                            </p>
                                        </td>
                                        <td className="border-white/0 py-3  pr-4" >
                                            <button onClick={() => setEdittingRowId(data.id)} className='linear px-4 rounded-xl bg-brand-500 py-1 text-[12px] font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200'>
                                                Засах
                                            </button>
                                        </td>
                                    </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </Card>
    );
}