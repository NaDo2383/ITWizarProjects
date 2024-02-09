import { RadialBarChart, RadialBar, Legend } from 'recharts'

const RadialBarLocal = (props: any) => {
    return (
        <RadialBarChart
            width={300}
            height={200}
            cx={150}
            cy={85}
            innerRadius={20}
            outerRadius={100}
            barSize={8}
            data={props.data}
        >
            <RadialBar
                label={{ position: 'insideStart', fill: 'none' }}
                background={{ fill: 'rgba(68, 42, 42, 1)' }}
                dataKey="uv"
                //suppressHydrationWarning
            />
            <Legend
                iconSize={10}
                width={120}
                height={140}
                layout="vertical"
                verticalAlign="middle"
                wrapperStyle={props.style}
            />
        </RadialBarChart>
    )
}

export default RadialBarLocal
