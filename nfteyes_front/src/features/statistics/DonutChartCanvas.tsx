import React from 'react'
import dynamic from 'next/dynamic'
import { useStatisticsCtx } from './useStatisticsCtx'

// Dynamically import ECharts library to prevent server-side rendering issues
const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false })

const DonutChartCanvas = () => {
    const { statsOfNFTsinChain } = useStatisticsCtx()
    const videoPerc = (statsOfNFTsinChain?.assetVideoCount / statsOfNFTsinChain?.assetAllCount) * 100
    const etcPerc = (statsOfNFTsinChain?.assetEtcCount / statsOfNFTsinChain?.assetAllCount) * 100
    const imagePerc = (statsOfNFTsinChain?.assetImageCount / statsOfNFTsinChain?.assetAllCount) * 100
    const audioPerc = (statsOfNFTsinChain?.assetSoundCount / statsOfNFTsinChain?.assetAllCount) * 100

    const tempArr = [
        { value: videoPerc, name: 'VIDEO' },
        { value: etcPerc, name: 'ETC' },
        { value: imagePerc, name: 'IMAGE' },
        { value: audioPerc, name: 'AUDIO' },
    ]

    const rawData: Array<{ value: number; name: string }> = tempArr.filter(
        (el: { value: number; name: string }): el is { value: number; name: string } => {
            return el.value > 0
        }
    )

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
                        formatter: ['{name|{b}}', '{br|}', '{title|{d}%}'].join('\n'), // Label format, {b} represents the name, {d} represents the percentage
                        textStyle: {
                            color: 'white', // Label text color
                        },
                        rich: {
                            title: {
                                color: '#9A91C6',
                                fontSize: 16,
                                fontWeight: '800',
                            },
                            name: {
                                color: '#FFF',
                                fontSize: 12,
                                padding: [10, 0, 0, 0],
                            },
                            br: {
                                width: '100%',
                                height: 15,
                            },
                        },
                        distanceToLabelLine: -45,
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
                style={{ height: '300px', width: '400px' }}
            />
        </div>
    )
}

export default DonutChartCanvas
