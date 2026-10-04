import React from "react";
import Chart from "react-apexcharts";

const DashboardPiecharts = () => {
  const data = {
    options: {},
    labels: ["A", "B", "C", "D", "E"],
    series: [44, 55, 41, 16, 15],
  };
  return <Chart {...data} type="donut" width="400" />;
};

export default DashboardPiecharts;
