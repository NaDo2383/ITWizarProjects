import React, { useEffect } from 'react'
import DonutMainChart from './DonutMainChart'
import useStatistics from './useStatistics'
import { useStatisticsCtx } from './useStatisticsCtx'
import Flex from 'components/ui/containers/flex/Flex'
import { Wrapper } from 'components/ui/containers/Wrapper'

const StatsMainCard = () => {
    const { getAnalyseStats } = useStatistics()
    const { statsMainData } = useStatisticsCtx()

    useEffect(() => {
        getAnalyseStats()
    }, [])

    return (
        <Wrapper>
            <div className="mb-[100px]">
                <div className="grid lg:grid-cols-3 grid-cols-1 justify-center items-center">
                    <Flex className="mt-80 flex flex-col justify-between items-center">
                        <h1 className="font-tekoRegular text-80 mb-40 text-[#E4E4E4]">
                            {statsMainData?.averAnalyseTime?.toFixed(2)} sec
                        </h1>
                        <p className="text-center text-gray-400 font-abelRegular text-25">Average analysis time</p>
                    </Flex>
                    <Flex className="mt-80 flex flex-col justify-between items-center">
                        <h1 className="font-tekoRegular text-80 mb-40 text-[#E4E4E4]">
                            {statsMainData?.nftCount?.toLocaleString()}
                        </h1>
                        <p className="text-center font-abelRegular text-gray-400 text-25">Analysis count</p>
                    </Flex>
                    <Flex className="flex lg:mt-[-10px] mt-60 flex-col justify-center items-center">
                        <DonutMainChart />
                        {/*<ApexRadialChart /> */}
                        <p className="text-center font-abelRegular text-gray-400 text-25">Asset type distribution</p>
                    </Flex>
                </div>
            </div>
        </Wrapper>
    )
}

export default StatsMainCard
