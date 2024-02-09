import React, { useEffect, useRef } from 'react'
import tw from 'tailwind-styled-components'
interface PieChartProps {
    data: number[]
    colors: string[]
}

const PieChart: React.FC<PieChartProps> = ({ data, colors }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const drawRingChart = (data: number[], colors: string[], canvas: HTMLCanvasElement) => {
            const ctx = canvas.getContext('2d')
            if (!ctx) {
                console.error('Could not get 2D context')
                return
            }

            const total = data.reduce((acc, value) => acc + value, 0)
            let startAngle = 0
            const innerRadius = canvas.width / 3 // Set the inner radius to 1/4 of canvas width

            for (let i = 0; i < data.length; i++) {
                const sliceAngle = (2 * Math.PI * data[i]) / total

                // Draw outer arc
                ctx.fillStyle = colors[i]
                ctx.beginPath()
                ctx.moveTo(canvas.width / 2, canvas.height / 2)
                ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, startAngle + sliceAngle)
                ctx.lineTo(canvas.width / 2, canvas.height / 2)
                ctx.fill()

                // Draw inner arc to create the ring effect
                ctx.fillStyle = '#fff' // Set inner color to background color
                ctx.beginPath()
                ctx.arc(canvas.width / 2, canvas.height / 2, innerRadius, startAngle, startAngle + sliceAngle)
                ctx.lineTo(canvas.width / 2, canvas.height / 2)
                ctx.fill()

                startAngle += sliceAngle
            }
        }

        const canvas = canvasRef.current

        if (canvas) {
            drawRingChart(data, colors, canvas)
        }
    }, [data, colors])

    return (
        <div>
            <Canvas ref={canvasRef} id="pieChart" width={400} height={400} />
        </div>
    )
}

const Canvas = tw.canvas`
    border 
`

export default PieChart
