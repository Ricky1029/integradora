import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js';

// Importa las escalas necesarias de Chart.js
import { CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

// Registra las escalas y elementos necesarios
Chart.register(CategoryScale, LinearScale, BarElement, Title);

const BarChart = () => {
  const Utils = {
    months: ({ count }) => {
      const months = [];
      for (let i = 0; i < count; i++) {
        months.push(`${i + 1} month`);
      }
      return months;
    },
  };

  const labels = Utils.months({ count: 7 });
  const data = {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          fontSize: 14,
        },
      },
      title: {
        display: true,
        text: 'Custom Chart Title',
        font: {
          size: 18,
          weight: 'bold'
        }
      }
    },
  };

  return (
    <div>
      <Bar
        data={data}
        options={options}
        height={400}
      />
    </div>
  );
};

export default BarChart;
