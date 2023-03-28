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

export const Chart = ({dates, amount, firstInterval, lastInterval}) => {
  const options = {
    scales: {
      x: {
        min: firstInterval, 
        max: lastInterval, 
        grid: {
          color: "transparent",
          borderColor: "transparent",
          tickColor: "transparent",
        },
        ticks: {
          color: "#214FF1",
        },
      },
      y: {
        display: false,
      },
    },
    responsive: true,
    // aspectRatio: 2.5,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data = {
    labels: dates,
    datasets: [
      {
        label: "",
        data: amount,
        backgroundColor: ["#214FF1"],
        borderColor: "#9BA5F8",
        // borderWidth: 3,
        // rotation: 0,
        // circumference: 360,
        pointRadius: 4,
        animation: {
          animateRotate: true,
        },
      },
    ],
  };

  return <Line options={options} data={data} />;
};
