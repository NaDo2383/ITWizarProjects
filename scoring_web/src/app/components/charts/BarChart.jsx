"use client"
import dynamic from "next/dynamic";
import React from "react";
import Chart from "react-apexcharts";

function ColumnChart(props) {
  const { chartData, chartOptions } = props;

  return (
    <Chart
      options={chartOptions}
      series={chartData}
      type="bar"
      width="100%"
      height="100%"
    />
  );
}

export default ColumnChart;
