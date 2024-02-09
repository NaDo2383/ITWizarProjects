import React from 'react'
import { Bar } from 'react-chartjs-2'
//import Chart from 'chart.js/auto'

export default function AssetChart(props) {
    // const axisType = props.data?.Type
    const userCustomX = +props.data?.UserCustom?.x
    const plotData = props.data?.Plot?.sort((a, b) => a.x - b.x)
    let userColorUsed = false
    const bgColor = plotData?.map((item) => {
        if (item.x === userCustomX && userColorUsed == false) {
            userColorUsed = true
            return 'rgb(22 201 37)'
        }
        return '#B9A0FF'
    })

    const data = {
        labels: plotData?.map((point) => {
            const value = point.x
            let valPresent = value
            if (value < 10000) {
                // 회
                valPresent = valPresent.toString()
                // valPresent += '회'
            } else if (10000 <= value && value < 100000000) {
                // 만-10'000
                valPresent = value / 10000
                valPresent = valPresent.toString().substring(0, 4)
                valPresent += '만'
            } else if (100000000 <= value && value < 1000000000000) {
                // 억
                valPresent = value / 100000000
                valPresent = valPresent.toString().substring(0, 4)
                valPresent += '억'
            } else if (1000000000000 <= value) {
                // 조
                valPresent = value / 1000000000000
                valPresent = valPresent.toString().substring(0, 4)
                valPresent += '조'
            }
            // `${point.x}`
            return valPresent
        }),
        datasets: [
            {
                type: 'bar',
                label: '가격(원)',
                backgroundColor: bgColor,
                data: plotData?.map((point) => +point.y),
            },
        ],
    }
    return (
        <div className="chart-container relative h-80 w-full">
            <Bar
                data={data}
                options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: props.xAxisLabel,
                                align: 'end',
                                font: {
                                    weight: 'bold',
                                },
                            },
                            grid: {
                                display: false,
                            },
                            ticks: {
                                // color: "white",
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: props.yAxisLabel,
                                align: 'end',
                                font: {
                                    weight: 'bold',
                                },
                            },
                            ticks: {
                                stepSize: props.yAxisStep,
                                // color: "white",
                                callback: function (value) {
                                    let valPresent = value
                                    if (value < 10000) {
                                        // 회
                                        valPresent = valPresent.toString()
                                        // valPresent += '회'
                                    } else if (10000 <= value && value < 100000000) {
                                        // 만-10'000
                                        valPresent = value / 10000
                                        valPresent = valPresent.toString().substring(0, 4)
                                        valPresent += '만'
                                    } else if (
                                        100000000 <= value &&
                                        value < 1000000000000
                                    ) {
                                        // 억
                                        valPresent = value / 100000000
                                        valPresent = valPresent.toString().substring(0, 4)
                                        valPresent += '억'
                                    } else if (1000000000000 <= value) {
                                        // 조
                                        valPresent = value / 1000000000000
                                        valPresent = valPresent.toString().substring(0, 4)
                                        valPresent += '조'
                                    }
                                    return valPresent
                                },
                            },
                        },
                    },
                    plugins: {
                        legend: { display: false },
                        decimation: {
                            enabled: true,
                        },
                        tooltip: {
                            usePointStyle: true,
                            position: 'nearest',
                            backgroundColor: '#131740',
                            titleAlign: 'center',
                            bodyAlign: 'center',
                            footerAlign: 'center',
                            padding: 10,
                            displayColors: false,
                            yAlign: 'bottom',
                        },
                    },
                    animation: false,
                }}
            />
        </div>
    )
}
