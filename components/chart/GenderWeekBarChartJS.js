import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function GenderWeekBarChartJS({ statGenderWeek }) {
  let datas = {
    labels: [],
    female: [],
    male: [],
    unknown: [],
  };

  statGenderWeek.forEach((el) => {
    datas.labels.push(el.date);
    datas.female.push(el.female);
    datas.male.push(el.male);
    datas.unknown.push(el.unknown);
  });

  const data = {
    labels: datas.labels,
    datasets: [
      {
        label: "Female",
        data: datas.female,
        backgroundColor: "rgb(255, 107, 107)",
      },
      {
        label: "Male",
        data: datas.male,
        backgroundColor: "rgb(255, 192, 120)",
      },
      {
        label: "Unknown",
        data: datas.unknown,
        backgroundColor: "rgb(255, 212, 59)",
      },
    ],
  };

  const options = {
    layout: {
      padding: 10,
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
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
          pointStyle: "rect",
        },
      },
    },
  };
  return <Bar data={data} options={options} />;
}
