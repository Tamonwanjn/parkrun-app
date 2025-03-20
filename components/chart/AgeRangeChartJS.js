import React from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
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
  Legend,
  ChartDataLabels
);
export default function AgeRangeChartJS({ statAgeRange }) {
  console.log(statAgeRange);

  let datas = {
    labels: [],
    Over80: [],
    Under19: [],
    Unknown: [],
    age20_29: [],
    age30_39: [],
    age40_49: [],
    age50_59: [],
    age60_69: [],
    age70_79: [],
  };

  statAgeRange.forEach((el) => {
    datas.labels.push(el.date);
    datas.Over80.push(el.Over80);
    datas.Under19.push(el.Under19);
    datas.age20_29.push(el.age20_29);
    datas.age30_39.push(el.age30_39);
    datas.age40_49.push(el.age40_49);
    datas.age50_59.push(el.age50_59);
    datas.age60_69.push(el.age60_69);
    datas.age70_79.push(el.age70_79);
    datas.Unknown.push(el.unknown);
  });

  const data = {
    labels: datas.labels,
    datasets: [
      {
        label: "Under 19",
        data: datas.Under19,
        backgroundColor: "rgb(255, 236, 153)",
      },
      {
        label: "Age 20 - 29",
        data: datas.age20_29,
        backgroundColor: "rgb(	208, 191, 255)",
      },
      {
        label: "Age 30 - 39",
        data: datas.age30_39,
        backgroundColor: "rgb(247, 131, 172)",
      },
      {
        label: "Age 40 - 49",
        data: datas.age40_49,
        backgroundColor: "rgb(77, 171, 247)",
      },
      {
        label: "Age 50 - 59",
        data: datas.age50_59,
        backgroundColor: "rgb(255, 169, 77)",
      },
      {
        label: "Age 60 - 69",
        data: datas.age60_69,
        backgroundColor: "rgb(130, 201, 30)",
      },
      {
        label: "Age 70 - 79",
        data: datas.age70_79,
        backgroundColor: "rgb(252, 194, 215)",
      },
      {
        label: "Over80",
        data: datas.Over80,
        backgroundColor: "rgb(250, 82, 82)",
      },
      {
        label: "Unknown",
        data: datas.Unknown,
        backgroundColor: "rgb(99, 230, 190)",
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
        display: "auto",
        color: "#444",
        font: {
          size: 10,
        },
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
