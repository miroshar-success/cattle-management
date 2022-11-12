import React from "react";
import { useState } from "react";
// import { Doughnut } from "react-chartjs-2";
// import { Bar } from "react-chartjs-2";
// import { Chart, registerables } from "chart.js";
import "./doughnutChart.css";
import { URL } from "../../constants/urls";
import axios from "axios";
import { header } from "../../constants/token";
// Chart.register(...registerables);

import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  BarElement,
} from "chart.js";
import { Doughnut, PolarArea, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function DoughnutChart() {
  const token = localStorage.getItem("tokenCattleTracker");
  console.log(token);

  const [stats, setStats] = useState("");

  React.useEffect(() => {
    async function getStats() {
      const response = await axios.get(URL + "animal/stats", header(token));
      setStats(response.data);
    }
    console.log(stats);
    getStats();
  }, []);

  let dataForChart;
  let dataLocation;
  if (stats.fetched) {
    let datasetsData = [];
    for (const key in stats.races) {
      if (Object.hasOwnProperty.call(stats.races, key)) {
        const element = stats.races[key];
        datasetsData.push(element.count);
      }
    }
    dataForChart = {
      labels: Object.keys(stats.races),
      datasets: [
        {
          label: "# by race",
          data: datasetsData,
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
            "rgba(255, 159, 64, 0.5)",
          ],
        },
      ],
    };

    // ----------------------------------------
    let datasetsForLocation = [];
    let dataForLocation = [];
    for (const key in stats.location) {
      if (Object.hasOwnProperty.call(stats.location, key)) {
        const element = stats.location[key];
        datasetsForLocation.push(key);
        dataForLocation.push(element.count);
      }
    }
    dataLocation = {
      labels: datasetsForLocation,
      datasets: [
        {
          data: dataForLocation,
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
            "rgba(255, 159, 64, 0.5)",
          ],
          borderWidth: 5,
        },
      ],
    };
  }

  console.log(stats);
  // eslint-disable-next-line
  const data = {
    labels: ["Vaca", "Toro", "Novillo", "Vaquillona", "Sin definir"],
    datasets: [
      {
        data: [2, 3, 4, 5],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderWidth: 5,
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
        text: "Chart.js Bar Chart",
      },
    },
  };

  return (
    <div>
      <h1>Doughnut Chart</h1>
      {/* <div id="chart"><Doughnut data={data} /></div> */}
      <div>
        {stats.fetched && (
          <Doughnut
            // data={data}
            data={dataForChart}
            width={150}
            height={150}
            options={{ maintainAspectRatio: false }}
          />
        )}
      </div>
      {stats.fetched && (
        <div>
          <PolarArea
            data={dataLocation}
            // width={250}
            // heigth={250}
            // options={{ maintainAspectRatio: false }}
          />
          <Bar
            data={dataForChart}
            option={options}
            // width={150}
            // height={150}
            // options={{ maintainAspectRatio: false }}
          />
        </div>
      )}
    </div>
  );
}
