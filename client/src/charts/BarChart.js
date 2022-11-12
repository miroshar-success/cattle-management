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
import faker from "faker";

import "./barchart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Nacimientos por mes",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Hembras",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      borderColor: "black",
      borderWidth: 2,
    },
    {
      label: "Machos",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      borderColor: "black",
      borderWidth: 2,
    },
  ],
};

export function BarChart() {
  return (
    <>
      <h1>BarChart demo</h1>
      <div className="barchart" style={{ width: 900 }}>
        <Bar options={options} data={data} />
      </div>
    </>
  );
}
