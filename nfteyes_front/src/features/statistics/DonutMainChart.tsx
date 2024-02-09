import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import useStatistics from './useStatistics'
import { useStatisticsCtx } from './useStatisticsCtx'

// Dynamically import ECharts library to prevent server-side rendering issues
const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false })

const DonutMainChart = () => {
    const { getAnalyseStats } = useStatistics()
    const { statsMainData } = useStatisticsCtx()
    const tempArr = [
        { value: statsMainData?.assetVideoCount, name: 'VIDEO' },
        { value: statsMainData?.assetSoundCount, name: 'AUDIO' },
        { value: statsMainData?.assetEtcCount, name: 'ETC' },
        { value: statsMainData?.assetImageCount, name: 'IMAGE' },
    ]

    const rawData: Array<{ value: number; name: string }> = tempArr.filter(
        (el: { value: number; name: string }): el is { value: number; name: string } => {
            return el.value > 0
        }
    )

    useEffect(() => {
        getAnalyseStats()
    }, [])

    // console.log('test', statsMainData)
    const getOption = () => {
        // Your ECharts options go here
        return {
            animation: false,
            series: [
                {
                    color: '#5E5E5E',
                    colorBy: 'series',
                    label: {
                        show: false,
                        position: 'inner',
                        fontSize: 14,
                    },
                    type: 'pie',
                    radius: ['34%', '35%'],
                    data: [{ value: 25, name: 'VIDEO' }],
                    nodeClick: false,
                    emphasis: {
                        disabled: true, // Disable hover scale change
                    },
                },
                {
                    color: ['#6D43B3', '#B88CFF', '#D5BBFF', '#5F2DB0'],
                    colorBy: 'data',
                    label: {
                        show: false,
                        position: 'inner',
                        fontSize: 14,
                    },
                    type: 'pie',
                    radius: ['40%', '60%'],
                    data: rawData,
                    emphasis: {
                        disabled: true, // Disable hover scale change
                    },
                },
                {
                    color: '#5E5E5E',
                    colorBy: 'series',
                    type: 'pie',
                    radius: ['64%', '65%'],
                    data: rawData,
                    label: {
                        show: true,
                        position: 'outside', // 'inside', 'center', 'outside', 'inner' are valid options
                        formatter: '{label|{b}}\n', // Label format, {b} represents the name, {d} represents the percentage
                        textStyle: {
                            color: 'white', // Label text color
                            fontSize: 12, // Label font size
                            fontWeight: '400', // Label font weight
                        },
                        distanceToLabelLine: -45,
                        rich: {
                            label: {
                                padding: [0, 0, 10, 0],
                            },
                        },
                    },
                    labelLine: {
                        length: 25,
                        length2: 50,
                    },
                    emphasis: {
                        disabled: true, // Disable hover scale change
                    },
                },
            ],
        }
    }

    return (
        <div>
            <ReactECharts
                option={getOption()}
                // ref={ref}
                notMerge={true} // Set to true to merge with the previous option
                lazyUpdate={true} // Set to true to delay updating the chart
                style={{ height: '250px', width: '350px' }}
            />
        </div>
    )
}

export default DonutMainChart
