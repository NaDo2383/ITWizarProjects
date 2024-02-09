"use client"
import React, { useEffect, useState } from "react"
import RatioTable from "../../components/indicator/RatioTable"
import RatioTableEdit from "../../components/indicator/RatioTableEdit"
import { useGlobalCtx } from "../../common/global/useGlobalCtx"
import useApiConnections from "../../features/connections/useApiConnections"
import { FormProvider } from "../../common/form/useFormCtx"

export default function RatioIndicator() {
    const { loading, ratioIndicator } = useGlobalCtx()
    const { getRatioIndicator } = useApiConnections()
    const [isEditting, setIsEditting] = useState(false)

    useEffect(() => {
        getRatioIndicator()
    }, [])

    return (
        <div className='mt-5 h-full flex'>
            {isEditting ?
                <FormProvider>
                    <RatioTableEdit tableData={ratioIndicator} setIsEditting={setIsEditting} />
                </FormProvider>
                :
                <RatioTable tableData={ratioIndicator} setIsEditting={setIsEditting} />
            }
        </div>
    )
}
