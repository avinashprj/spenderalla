import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement);

export const options = {
  responsive: true,
  borderWidth: 5,
  borderSkipped: false,
  minBarLength: 20,
  borderColor: '#fff',
  events: ["click"],
  indexAxis: "x",
  scales: {
    x: {
      display: true,
      ticks: {
        crossAlign: 'center',
        minRotation: 90,
        color: "#000",
      },
      grid: {
        borderColor: "transparent",
        drawOnChartArea: false,
        drawTicks: true,
        tickColor: "transparent",
      },
    },
    y: {
      display: false,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};



export function Chart({ prepareCalculations, setExpenseOfCategory }) {
  const [labels, amount] = prepareCalculations;

  const plugins = [
    {
      id: "clickAfter",
      afterEvent(chart) {
        setExpenseOfCategory(chart.tooltip.dataPoints[0].raw);
      },
    },
  ];

  const data = {
    labels,
    datasets: [
      {
        data: amount,
        backgroundColor: "#214FF1",
        borderRadius: "10",
        barPercentage: 0.5,
      },
    ],
  };

  return <Bar options={options} data={data} plugins={plugins} />;
}
