import React, { useEffect, useState } from 'react'
import useAnalyze from 'features/analyze/store/useAnalyze'
import { useAnalyzeCtx } from 'features/analyze/store/useAnalyzeCtx'
import Image from 'next/image'
import AnalyzeTable from 'features/analyze/table/resultTable/AnalyzeTable'
import Flex from 'components/ui/containers/flex/Flex'
import { useRouter } from 'next/router'

function AnalyzeTableForm() {
    const { getAnalysisResult } = useAnalyze()
    const { analyzeState } = useAnalyzeCtx()
    const { query } = useRouter()
    const [theSrc, setTheSrc] = useState('')

    useEffect(() => {
        if (query?.id) {
            getAnalysisResult(+query?.id!)
        }
    }, [query])

    useEffect(() => {
        if (analyzeState?.analyzeResult?.originalassetpath) {
            setTheSrc(`${process.env.NEXT_BACKEND_URL}/images/view/${analyzeState?.analyzeResult?.originalassetpath}`)
        }
    }, [analyzeState?.analyzeResult])

    return (
        <div className="w-full md:flex-col">
            <h1 className="text-center mt-80 mb-[17px]">Analysis Result</h1>
            <Flex className=" gap-[25px] flex-col xl:flex-row">
                <div className="mt-[35px]">
                    {analyzeState?.analyzeResult && (
                        <Image
                            src={theSrc}
                            width={195}
                            height={195}
                            alt="image of symbols"
                            onError={(e) => {
                                console.error(e)
                                setTheSrc('/images/demo-artwork.png')
                            }}
                        />
                    )}

                    <h5 className="text-20 text-gray-40 leading-[32px] font-abelRegular py-5">Analysis ID</h5>
                    <Flex className="items-center rounded-md w-[195px] h-50 pl-15 text-gray-600 text-22 font-abelRegular bg-black">
                        {analyzeState?.analyzeResult?.id}
                    </Flex>
                </div>
                <Flex className="flex-col w-full gap-[10px]">
                    <p className=" text-22 text-pinkerbell">
                        {analyzeState?.analyzeResult?.analynftcount} NFTs detected.{' '}
                    </p>
                    <AnalyzeTable noPagination />
                </Flex>
            </Flex>
        </div>
    )
}

export default AnalyzeTableForm
