import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AllStatLineChartJS({ statresult }) {
  const labels = statresult[0].data.map((label) => {
    return label.x;
  });

  const datas = statresult.map((el, i) => {
    return {
      label: el.id,
      data: el.data.map((data) => {
        return data.y;
      }),
    };
  });

  const lineProperties = {
    pointRadius: 6,
    fill: false,
    borderWidth: 2,
    hoverBorderWidth: 10,
  };

  const options = {
    layout: {
      padding: 10,
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        title: {
          display: true,
          text: "จำนวน",
        },
      },
    },
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        usePointStyle: true,
        pointStyle: "circle",
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      { ...datas[0], borderColor: "rgb(28,126,214)", ...lineProperties },
      { ...datas[1], borderColor: "rgb(255,169,77)", ...lineProperties },
      { ...datas[2], borderColor: "rgb(47, 158, 68)", ...lineProperties },
    ],
  };

  return <Line data={data} options={options} />;
}
