import React from 'react'
// import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels)

export const data = {
    labels: ['VIDEO', 'AUDIO', 'ETC', 'IMAGE'],
    datasets: [
        {
            label: 'Percentage',
            data: [25, 17, 9, 50],
            backgroundColor: ['#6D43B3', '#B88CFF', '#D5BBFF', '#5F2DB0'],
            borderColor: ['#6D43B3', '#B88CFF', '#D5BBFF', '#5F2DB0'],
            borderWidth: 1,
            width: 20,
        },
    ],
}

const DonutChart: React.FC = () => {
    // const options = {
    //     legend: {
    //         display: true,
    //         position: 'right', // You can set the position to 'top', 'bottom', 'left', or 'right'
    //     },
    //     cutout: 90, // Adjust this value to control the padding
    //     plugins: {
    //         legend: {
    //             display: false,
    //         },
    //         datalabels: {
    //             display: true,
    //             color: 'white',
    //             anchor: 'center',
    //             align: 'center',
    //         },
    //     },
    //     afterDraw: (chart: Chart<'doughnut'>) => {
    //         console.log(chart)

    //         if (chart) {
    //             const ctx = chart.ctx
    //             const width = chart.width as number
    //             const height = chart.height as number

    //             const meta = chart.getDatasetMeta(0)

    //             if (meta) {
    //                 meta.data.forEach((element, index) => {
    //                     const model = element.getProps([
    //                         'base',
    //                         'current',
    //                         'offset',
    //                         'startAngle',
    //                         'endAngle',
    //                         'innerRadius',
    //                         'outerRadius',
    //                     ])

    //                     // Calculate label position
    //                     const middleAngle = (model.startAngle + model.endAngle) / 2
    //                     const labelRadius = model.innerRadius + (model.outerRadius - model.innerRadius) * 0.5

    //                     const labelPosition = {
    //                         x: width / 2 + labelRadius * Math.cos(middleAngle),
    //                         y: height / 2 + labelRadius * Math.sin(middleAngle),
    //                     }

    //                     // Draw label background
    //                     ctx.beginPath()
    //                     ctx.arc(labelPosition.x, labelPosition.y, 5, 0, 2 * Math.PI)
    //                     ctx.fillStyle = '#fff' // Set the color of the label background
    //                     ctx.fill()

    //                     // Draw label text
    //                     ctx.font = '12px Arial'
    //                     ctx.fillStyle = '#000' // Set the color of the label text
    //                     ctx.textAlign = 'center'
    //                     ctx.fillText(data.labels[index], labelPosition.x, labelPosition.y)
    //                 })
    //             }
    //         }
    //     },
    // }
    return <div>{/* <Doughnut data={data} options={options} style={{ height: 181.5, width: 251 }} /> */}</div>
}

export default DonutChart
