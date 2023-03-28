import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  aspectRatio: 2.5,
  plugins: {
    legend: {
      display: false,
    },
  },
};

export function Chart({result}) {

 const data = {
    labels: ["Amount", "Budget"],
    datasets: [
      {
        data: result,
        backgroundColor: ["#214FF1", "#F8F8F8"],
        borderColor: ["#214FF1", "#214FF1"],
        borderWidth: 2,
        rotation: 0,
        circumference: 360,
        animation: {
          animateRotate: true,
        },
      },
    ],
  };

  return <Doughnut options={options} data={data} />;
}