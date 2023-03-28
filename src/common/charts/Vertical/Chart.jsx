import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getMonthStringShort } from 'services/dates/format.helpers';

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
  borderSkipped: false,
  indexAxis: 'x',
  scales: {
    x: {
      display: true,
      ticks: {
        minRotation: 90,
        mirror: false,
        color: '#000',
      },
      grid: {
        borderColor: 'transparent',
        drawOnChartArea: false,
        drawTicks: true,
        tickColor: 'transparent'
      }
    },
    y: {
      display: false
    }
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

export function Chart({monthA, monthB, budgetCompare}) {

const data = {
  labels: ['Total', 'Bills', 'Food', 'Clothes', 'Transport', 'Fun', 'Other'],
  datasets: [
    {
      categoryPercentage: 0.6,
      barPercentage: 0.6,
      label: getMonthStringShort(new Date(budgetCompare.date.a.year, budgetCompare.date.a.month)),
      data: monthA[1],
      backgroundColor: '#214FF1',
      borderRadius: '50',
    },
    {
      categoryPercentage: 0.6,
      barPercentage: 0.6,
      label: getMonthStringShort(new Date(budgetCompare.date.b.year, budgetCompare.date.b.month)),
      data: monthB[1],
      backgroundColor: ['#3BD0FF'],
      borderRadius: '50',
    }
  ],
};

  return <Bar options={options} data={data} />;
}