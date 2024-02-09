import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

const RadialBarLocal = () => {
    const chartOptions: ApexOptions = {
        chart: {
            type: 'radialBar',
        },
        series: [75, 65, 50, 25],
        colors: ['#4C2CAE', '#5E44AC', '#7059AA', '#917CAB'],
        labels: ['10 sec', '8 sec', '5 sec', '3 sec'],
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 5,
                    size: '30%',
                    background: 'transparent',
                    image: undefined,
                },
                track: {
                    background: 'rgba(68, 42, 42, 1)',
                },
            },
        },
        legend: {
            show: true,
            position: 'right',
            fontSize: '14px',
            offsetX: 0,
            offsetY: 30,
            labels: {
                colors: undefined,
                useSeriesColors: false,
            },
            itemMargin: {
                vertical: 1,
            },
        },
    }
    return (
        <ReactApexChart options={chartOptions} series={chartOptions.series} type="radialBar" height={250} width={400} />
    )
}

export default RadialBarLocal
