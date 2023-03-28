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

export function Chart({budgetCurrent, totalAmount}) {
  const result = totalAmount > budgetCurrent ? [100, 0] : [(totalAmount * 100) / budgetCurrent, 100 - (totalAmount * 100) / budgetCurrent] 
  
  const data = {
    labels: ["Expenses", "Left"],
    datasets: [
      {
        label: "",
        data: result,
        backgroundColor: ["#214FF1", "#F8F8F8"],
        rotation: 270,
        circumference: 180,
        animation: {
          animateRotate: true,
        },
      },
    ],
  };
  
  return <Doughnut options={options} data={data} />;
}
