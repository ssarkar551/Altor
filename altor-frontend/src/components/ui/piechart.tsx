// components/PieChartComponent.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { CategoryCounts } from '../../types/page';
import { generateRandomColor } from '@/utils/randomColors';

interface PieChartProps {
  data: CategoryCounts;
  title: string;
}

const PieChartComponent: React.FC<PieChartProps> = ({ data, title }) => {
  const chartData = {
    labels: data.labels,
    datasets: [{
      label: title,
      data: data.values,
      backgroundColor: [
        data.labels.map(() => generateRandomColor(0.2))
      ],
      borderColor: [
        data.labels.map(() => generateRandomColor(1))
      ],
      borderWidth: 1,
    }],
  };

  return <Pie data={chartData} />;
};

export default PieChartComponent;
