import Flex from 'components/ui/containers/flex/Flex'
import React, { useEffect, useState } from 'react'
import { VerticalChart } from './VerticalChart'
// import DonutChart from './DonutChart'
import DonutChartCanvas from './DonutChartCanvas'
import { useStatisticsCtx } from './useStatisticsCtx'
import { icons } from '../../../public/images/icons/icons'

const StatsOfNFTsInChain = ({ selectedIcon }: { selectedIcon: number }) => {
    const { statsOfNFTsinChain } = useStatisticsCtx()
    const [iconName, setIconName] = useState<string>(icons[selectedIcon].name)

    useEffect(() => {
        setIconName(icons[selectedIcon].name)
    }, [selectedIcon])

    return (
        <Flex className="bg-[#25252A] flex-col md:flex-row pt-[30px] pb-[24px] mt-[26px] justify-center">
            <div className="">
                <div className="text-[#fff] text-center text-[24px] font-SignikascRegular">Asset type distribution</div>
                <DonutChartCanvas />
            </div>
            <div className="mr-[40px] text-center">
                <div className="text-[#fff] text-center text-[24px] font-SignikascRegular">
                    Number of copies in [
                    <span className="text-[#D38CFF] underline text-[24px] font-400">{iconName}</span>]
                </div>
                <div className="text-[#e4e4e4] font-tekoRegular text-[80px] mt-[61px]">
                    {statsOfNFTsinChain?.nftCount?.toLocaleString()}
                </div>
                <div className="text-[#9A91C6] font-Inter text-[16px] mt-[-23px]">copies existing</div>
            </div>
            <div className="h-full">
                <div className="text-[#fff] text-center text-[24px] font-SignikascRegular">
                    Number of NFTs in [<span className="text-[#D38CFF] underline text-[24px] font-400">{iconName}</span>
                    ]
                </div>
                <VerticalChart />
            </div>
        </Flex>
    )
}

export default StatsOfNFTsInChain
