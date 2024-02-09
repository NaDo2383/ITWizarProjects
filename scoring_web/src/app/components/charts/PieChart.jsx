"use client"
import dynamic from "next/dynamic";
import React from "react";
import ReactApexChart from "react-apexcharts";

function PieChart(props) {
  const { chartData, chartOptions } = props;


  return (
    <ReactApexChart
      options={chartOptions}
      series={chartData && chartData}
      type="pie"
      width="100%"
      height="100%"
    />
  );

}

export default PieChart;
