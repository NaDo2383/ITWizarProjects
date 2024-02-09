import { Wrapper } from 'components/ui/containers/Wrapper'
import Flex from 'components/ui/containers/flex/Flex'
import DatePickerByDays from 'components/ui/datePicker/DatePickerByDays'
import React, { useEffect, useState } from 'react'
import { IconType, icons } from '../../../public/images/icons/icons'
import StatisticTitle from 'components/ui/typography/StatisticTitle'
import StatsOfNFTEyes from 'features/statistics/StatsOfNFTEyes'
import StatsOfNFTsInChain from 'features/statistics/StatsOfNFTsInChain'
import DatePickerByMonths from 'components/ui/datePicker/DatePickerByMonths'
import DatePickerByYear from 'components/ui/datePicker/DatePickerByYear'
import useStatistics from './useStatistics'
import { useStatisticsCtx } from 'features/statistics/useStatisticsCtx'

const datePickerRanges: string[] = ['Day', 'Week', 'Month', 'Year']

const StatisticsPage: React.FC = () => {
    const [selectedIcon, setSelectedIcon] = useState<number>(0)
    const [hoveredIcon, setHoveredIcon] = useState<number | null>(0)
    const [selectedRange, setSelectedRange] = useState<number>(0)
    const { getStatOfNFTsInChain } = useStatistics()
    const { endDate, startDate } = useStatisticsCtx()

    useEffect(() => {
        getStatOfNFTsInChain({ startDate, endDate, chainId: selectedIcon, type: selectedRange })
    }, [startDate, endDate, selectedIcon, selectedRange])

    return (
        <Wrapper>
            <Flex className="gap-[15px] mt-[50px]">
                {icons?.map((icon: IconType, index: number) => (
                    <div
                        key={index}
                        onClick={() => setSelectedIcon(index)}
                        style={{
                            cursor: 'pointer',
                            borderRadius: '10px',
                            background: '#2D2A3B',
                            boxShadow: index === selectedIcon ? '0px 4px 15px 0px rgba(161, 71, 252, 0.60)' : '',
                        }}
                        onMouseEnter={() => setHoveredIcon(index)}
                        onMouseLeave={() => setHoveredIcon(null)}
                    >
                        {index === selectedIcon || index === hoveredIcon ? icon.selected : icon.notSelected}
                    </div>
                ))}
            </Flex>
            <StatisticTitle>Stats of NFTEYES</StatisticTitle>
            <StatsOfNFTEyes selectedIcon={selectedIcon} />
            <StatisticTitle className="mt-[30px]">Stats of NFTs in chain</StatisticTitle>
            <Flex className=" justify-center gap-[14px]">
                {selectedRange === 0 || selectedRange === 1 ? (
                    <DatePickerByDays selectedRange={selectedRange} />
                ) : selectedRange === 2 ? (
                    <DatePickerByMonths selectedRange={selectedRange} />
                ) : (
                    <DatePickerByYear selectedRange={selectedRange} />
                )}
                <Flex className="gap-[10px]">
                    {datePickerRanges?.map((e, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => setSelectedRange(index)}
                                className={`p-[10px_15px] text-white font-abelRegular text-[20px] leading-[30px] rounded-[8px] h-[50px] cursor-pointer ${
                                    selectedRange === index ? 'bg-purple' : 'bg-blackPurple'
                                }`}
                            >
                                {e}
                            </div>
                        )
                    })}
                </Flex>
            </Flex>
            <StatsOfNFTsInChain selectedIcon={selectedIcon} />
        </Wrapper>
    )
}

export default StatisticsPage
