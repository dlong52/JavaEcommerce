import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyRevenueChart = ({ dailyRevenue }) => {
  const chartData = {
    labels: Array.from({ length: 31 }, (_, i) => `Ngày ${i + 1}`), // Labels for each day
    datasets: [
      {
        label: 'Doanh Thu',
        data: dailyRevenue,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Doanh Thu Theo Ngày Trong Tháng ' + (new Date().getMonth() + 1),
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} width={500} />;
};

export default MonthlyRevenueChart;
