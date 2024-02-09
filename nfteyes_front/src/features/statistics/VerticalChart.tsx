import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useStatisticsCtx } from './useStatisticsCtx'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const options = {
    responsive: true,
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                display: true,
                color: 'rgba(100, 100, 100, 1)',
            },
            ticks: {
                color: 'rgba(187, 187, 187, 1)',
            },
        },
        x: {
            grid: {
                display: false,
            },
            ticks: {
                color: 'rgba(187, 187, 187, 1)',
            },
        },
    },
    plugins: {
        legend: {
            display: false,
        },
        datalabels: {
            display: false,
        },
    },
}

export function VerticalChart() {
    const { statsOfNFTsinChain } = useStatisticsCtx()

    const labelData = statsOfNFTsinChain?.dailyStats?.map((obj: { date: any }) => obj.date)
    const rawData = statsOfNFTsinChain?.dailyStats?.map((obj: { count: any }) => obj.count)

    const labels = labelData
    const data = {
        labels,
        datasets: [
            {
                label: 'Number of NFTs in [Ethereum]',
                data: rawData,
                borderColor: '#EF7BE3',
                backgroundColor: '#EF7BE3',
                borderWidth: 0.5,
                pointBackgroundColor: 'rgba(239, 123, 227) ', // Color of the data points
                pointBorderColor: 'rgba(239, 123, 227, 0.1)', // Color of the data point borders
                pointBorderWidth: 2, // Width of the data point borders
                pointWith: 1,
                // borderWidth: 0,
            },
        ],
    }

    return (
        <div className=" h-full text-white mt-[50px]">
            <Line options={options} data={data} style={{ height: 207, width: 381 }} />
        </div>
    )
}
