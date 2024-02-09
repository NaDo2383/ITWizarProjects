"use client"
import Card from "../../card";
import dynamic from 'next/dynamic'
const PieChart = dynamic(() => import("../../charts/PieChart"), { ssr: false });



const PieChartCard = (props) => {
  const { loanData } = props;

  const pieChartData = [loanData?.loanFailCount, loanData?.loanSuccessCount]
  const pieChartOptions = {
    labels: ["Амжилтгүй тооцоолсон", "Амжилттай тооцоолсон"],
    colors: ["#4318FF", "#6AD2FF",],
    chart: {
      width: "50px",
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    hover: { mode: null },
    plotOptions: {
      donut: {
        expandOnClick: false,
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    fill: {
      colors: ["#4318FF", "#6AD2FF"],
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      style: {
        fontSize: "12px",
        fontFamily: undefined,
        backgroundColor: "#000000",
      },
    },
  }

  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">

          </h4>
        </div>

        <div className="mb-6 flex items-center justify-center">
          <select disabled className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white">
            <option value="monthly">Өнөөдөр</option>
            <option value="yearly">7 хоног</option>
            <option value="weekly">Сар</option>
          </select>
        </div>
      </div>

      <div className="mb-auto flex h-[220px] w-full items-center justify-center">
        <PieChart chartOptions={pieChartOptions} chartData={pieChartData} />
      </div>
      <div className="flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 mx-3 rounded-full bg-brand-500" />
            <p className="ml-1 text-sm font-normal text-gray-600">Амжилтгүй тооцоолсон</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700  dark:text-white">
            {loanData?.loanFailCount && loanData?.loanSuccessCount ? (loanData?.loanFailCount / (+loanData?.loanFailCount + +loanData?.loanSuccessCount)).toFixed(2) * 100 : 0}%
          </p>
        </div>

        <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 mx-3 rounded-full bg-[#6AD2FF]" />
            <p className="ml-1 text-sm font-normal text-gray-600">Амжилттай тооцоолсон</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
            {loanData?.loanSuccessCount && loanData?.loanSuccessCount ? (loanData?.loanSuccessCount / (+loanData?.loanFailCount + +loanData?.loanSuccessCount)).toFixed(2) * 100 : 0}%
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PieChartCard;
