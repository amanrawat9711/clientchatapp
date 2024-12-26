import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJs,
  Tooltip,
  Filler,
  CategoryScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  LinearScale,
} from "chart.js";
import { getLast7Days } from "../../lib/features";

ChartJs.register(
  Tooltip,
  Filler,
  CategoryScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  LinearScale
);

const labels = getLast7Days();

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};
const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        borderColor: "purple",
        backgroundColor: "rgba(50, 23, 77, 0.5)",
        label: "Messages",
        fill: true,
      },
    ],
  };
  return <Line data={data} options={lineChartOptions} />;
};
const DoughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout:120
  };
const DoughnutChart = ({value=[],labels=[]}) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        borderColor: ["purple","#00827F"],
        backgroundColor: ["rgba(50, 23, 77, 0.5)","#20B2AA"],
        hoverBackgroundColor:["rgba(50, 23, 77, 0.5)","#20B2AA"],
        offset:30,
      },
    ],
  };
  return <Doughnut style={{zIndex:10}} data={data} options={DoughnutChartOptions}/>;
};

export { LineChart, DoughnutChart };
