import React, { useEffect } from 'react'
import StatsOfNFTEyesCard from './StatsOfNFTEyesCard'
import Flex from 'components/ui/containers/flex/Flex'
import useStatistics from './useStatistics'
import { useStatisticsCtx } from './useStatisticsCtx'

const StatsOfNFTEyes = ({ selectedIcon }: { selectedIcon: number }) => {
    const { getAnalyseStatistics } = useStatistics()
    const { statsOfNFTEYES } = useStatisticsCtx()

    useEffect(() => {
        getAnalyseStatistics(selectedIcon)
    }, [selectedIcon])

    return (
        <Flex className="w-full justify-center flex-col md:flex-row  gap-[85px] bg-[#141416] border border-y-0 border-white py-[30px] mt-[9px]">
            <StatsOfNFTEyesCard
                header="Analysis rate"
                stat={(
                    (statsOfNFTEYES?.startBlockNumber / statsOfNFTEYES?.endBlockNumber
                        ? statsOfNFTEYES?.startBlockNumber / statsOfNFTEYES?.endBlockNumber
                        : 0) * 100
                ).toFixed(2)}
            >
                <div className="text-[#ccc] mt-[-8px] font-Inter">
                    {statsOfNFTEYES?.startBlockNumber.toLocaleString() +
                        '/' +
                        statsOfNFTEYES?.endBlockNumber.toLocaleString()}
                </div>
                <div className="text-[#6A676C] text-[15px] font-Inter mt-[9px]">
                    Number of analysed blocks/ <br /> Total number of blocks in chain
                </div>
            </StatsOfNFTEyesCard>
            <StatsOfNFTEyesCard header="Analysis request counts" stat={statsOfNFTEYES?.requestCount.toLocaleString()}>
                <div className="text-[#CCCCCC] text-[16px] font-Inter mt-[9px]">Analysis were requested</div>
            </StatsOfNFTEyesCard>
            <StatsOfNFTEyesCard header="Average time of analysis" stat={statsOfNFTEYES?.averAnalyseTime.toFixed(1)}>
                <div className="text-[#CCCCCC] text-[16px] font-Inter mt-[9px]">seconds in average</div>
            </StatsOfNFTEyesCard>
        </Flex>
    )
}

export default StatsOfNFTEyes
