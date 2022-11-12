import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart({ statsObj, by, title }) {
  let dataArrayParsed = [];
  for (const key in statsObj) {
    if (Object.hasOwnProperty.call(statsObj, key)) {
      const element = statsObj[key];
      dataArrayParsed.push(element.count);
    }
  }

  const data = {
    // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    labels: Object.keys(statsObj),
    datasets: [
      {
        label: `# por ${by}`,
        data: dataArrayParsed,
        backgroundColor: [
          //novillo:
          "rgba(145, 204, 239, 0.4)",
          // toro:
          "rgba(25, 68, 222, 0.4)",
          // vaquillona :
          "rgba(219, 245, 17, 0.55)",
          // "rgba(216, 47, 25, 0.4)",
          // vaca :
          "rgba(255, 0, 70, 0.4)",
          //---
          "rgba(216, 47, 25, 0.4)",
          "rgba(153, 102, 255, 0.4)",
          "rgba(255, 159, 64, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(255, 165, 65, 0.4)",
          "rgba(155, 99, 132, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(255, 106, 86, 0.4)",
          "rgba(75, 192, 192, 0.4)",
          "rgba(153, 102, 255, 0.4)",
          "rgba(255, 159, 64, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(205, 206, 86, 0.4)",
          "rgba(35, 192, 192, 0.4)",
          "rgba(94, 162, 235, 0.4)",
          "rgba(105, 206, 86, 0.4)",
          "rgba(35, 232, 192, 0.4)",
          "rgba(34, 162, 235, 0.4)",
          "rgba(235, 106, 86, 0.4)",
          "rgba(35, 192, 112, 0.4)",
        ],
        borderColor: [
          "grey",
          // "rgba(21, 135, 34, 0.8)",
          // "grey",
          // "grey",
          // "grey",
          // "grey",
          // "rgba(155, 99, 132, 0.8)",
          // "rgba(54, 162, 235, 0.8)",
          // "rgba(255, 106, 86, 0.8)",
          // "rgba(75, 192, 192, 0.8)",
          // "rgba(153, 102, 255, 0.8)",
          // "rgba(255, 159, 64, 0.8)",
          // "rgba(54, 162, 235, 0.8)",
          // "rgba(205, 206, 86, 0.8)",
          // "rgba(35, 192, 192, 0.8)",
          // "rgba(94, 162, 235, 0.8)",
          // "rgba(105, 206, 86, 0.8)",
          // "rgba(35, 232, 192, 0.8)",
          // "rgba(34, 162, 235, 0.8)",
          // "rgba(235, 106, 86, 0.8)",
          // "rgba(35, 192, 112, 0.8)",
        ],
        borderWidth: 1,
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
        text: title,
      },
    },
    maintainAspectRatio: false,
  };

  return <Pie data={data} options={options} />;
}
