import React from 'react';
import { Pie } from 'react-chartjs-2';
import { CategoryCounts } from '../../types/page';
import { generateRandomColor } from '@/utils/randomColors';

interface PieChartProps {
  data: CategoryCounts;
  title: string;
}

const PieChartComponent: React.FC<PieChartProps> = ({ data, title }) => {
    const backgroundColors = data.labels.map(() => generateRandomColor(0.2));
    const borderColors = data.labels.map(() => generateRandomColor(1));
  const chartData = {
    labels: data.labels,
    datasets: [{
      label: title,
      data: data.values,
      backgroundColor: [
        backgroundColors
      ],
      borderColor: [
        borderColors
      ],
      borderWidth: 1,
    }],
  };

  return <Pie data={chartData} />;
};

export default PieChartComponent;
