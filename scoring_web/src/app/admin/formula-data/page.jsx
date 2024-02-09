"use client"
import React, { useEffect, useState } from 'react'
import { useGlobalCtx } from '../../common/global/useGlobalCtx';
import useApiConnections from '../../features/connections/useApiConnections'
import FormulaTable from "../../components/formula/FormulaTable"
import { FormProvider } from '../../common/form/useFormCtx';

export default function FormulaData() {
    const { loading, formulaDataList } = useGlobalCtx();
    const { getFormulaDataList } = useApiConnections()

    useEffect(() => {
        getFormulaDataList();
    }, [])


    if (loading) {
        return "Loading ..."
    } else {
        return (
            <div className="mt-5 h-full flex ">
                <FormProvider>
                    <FormulaTable tableData={formulaDataList} />
                </FormProvider>
            </div>
        )
    }

}
