"use client"
import Card from "../../card";
import { MdBarChart } from "react-icons/md";
import dynamic from 'next/dynamic'
const BarChart = dynamic(() => import("../../charts/BarChart"), { ssr: false });


const WeeklyRevenue = (props) => {
  const { loanStat } = props;
  const categories = [];
  const successful = [];
  const failed = [];

  loanStat?.forEach(item => {
    categories.push(item.date)
    successful.push(item.successCount)
    failed.push(item.failCount)
  });
  const barChartOptionsWeeklyRevenue = {
    chart: {
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    // colors:['#ff3322','#faf']
    tooltip: {
      style: {
        fontSize: '12px',
        fontFamily: undefined,
        backgroundColor: '#000000',
      },
      theme: 'dark',
      onDatasetHover: {
        style: {
          fontSize: '12px',
          fontFamily: undefined,
        },
      },
    },
    xaxis: {
      categories: categories,
      show: false,
      labels: {
        show: true,
        style: {
          colors: '#A3AED0',
          fontSize: '14px',
          fontWeight: '500',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      color: 'black',
      labels: {
        show: false,
        style: {
          colors: '#A3AED0',
          fontSize: '14px',
          fontWeight: '500',
        },
      },
    },

    grid: {
      borderColor: 'rgba(163, 174, 208, 0.3)',
      show: true,
      yaxis: {
        lines: {
          show: false,
          opacity: 0.5,
        },
      },
      row: {
        opacity: 0.5,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: 'solid',
      colors: ['#5E37FF', '#6AD2FF'],
    },
    legend: {
      show: false,
    },
    colors: ['#5E37FF', '#6AD2FF'],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '20px',
      },
    },
  };

  const barChartDataWeeklyRevenue = [
    {
      name: 'Амжилтгүй',
      data: failed,
      color: '#4318FF',
    },
    {
      name: 'Амжилттай',
      data: successful,
      color: '#6AD2Fa',
    },
  ];

  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">

      <div className="mb-auto flex items-center justify-between px-6">
        <h2 className="text-lg font-bold text-navy-700 dark:text-white">
          Сүүлийн сард
        </h2>
        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="md:mt-16 lg:mt-0">
        <div className="h-[250px] w-full xl:h-[350px]">
          <BarChart
            chartData={barChartDataWeeklyRevenue}
            chartOptions={barChartOptionsWeeklyRevenue}
          />
        </div>
      </div>
    </Card>
  );
};

export default WeeklyRevenue;
