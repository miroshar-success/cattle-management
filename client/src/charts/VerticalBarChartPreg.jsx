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

export function VerticalBarChartPreg({
  statsObjPreg,
  statsObjNotPreg,
  title,
  by,
}) {
  const labels = ["Positivo", "Negativo"];
  const labelPositivo = ["Positivo"];
  // const labels = ["Estado de embarazo"];
  console.log("statsObjNotPreg", statsObjNotPreg);
  let dataArrayParsed = [];
  // for (const key in statsObjPreg) {
  //   if (Object.hasOwnProperty.call(statsObjPreg, key)) {
  //     const element = statsObjPreg[key];
  //     dataArrayParsed.push(element.count);
  //   }
  // }
  dataArrayParsed.push(statsObjPreg?.count);
  // dataArrayParsed.push(statsObjNotPreg?.count);

  // for (const key in statsObjNotPreg) {
  //   if (Object.hasOwnProperty.call(statsObjNotPreg, key)) {
  //     const element = statsObjNotPreg[key];
  //     dataArrayParsed.push(element.count);
  //   }
  // }

  const data = {
    // labels: labels,
    labels: [""],
    datasets: [
      {
        label: `Positivo`,
        data: dataArrayParsed,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(255, 206, 86, 0.4)",
          "rgba(75, 192, 192, 0.4)",
          "rgba(153, 102, 255, 0.4)",
          "rgba(255, 159, 64, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(205, 206, 86, 0.4)",
          "rgba(35, 192, 192, 0.4)",
        ],
      },
      {
        label: "Negativo",
        data: [statsObjNotPreg?.count],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Estado de embarazo",
      },
    },
  };

  return <Bar options={options} data={data} />;
}
