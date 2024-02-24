import React from 'react';
import { Bar } from 'react-chartjs-2';
import { CategoryCounts } from '../../types/page';

interface BarChartProps {
  data: CategoryCounts;
  title: string;
}

const BarChartComponent: React.FC<BarChartProps> = ({ data, title }) => {
  const chartData = {
    labels: data.labels,
    datasets: [{
      label: title,
      data: data.values,
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChartComponent;
