// // pages/dashboard.tsx
"use client"
import 'chart.js/auto';
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

interface ChartData {
  zone: string[];
  data: number[];
  labels: string[];
  backgroundColor: string[];
  totalDevices: number;
}

const PieChartDemo = () => {
  const [deviceChartData, setdeviceChartData] = useState<ChartData[]>([]);
  const [vehicleChartData, setvehicleChartData] = useState<ChartData[]>([]);
  const [ccChartData, setccChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://20.121.141.248:5000/assignment/feb/sde_fe');
        const json = await response.json();
        const data = json.data;

        setdeviceChartData(processData(data), device_brand);
      } catch (error) {
        console.log('Error while fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const processData = (data: any[], type: any) => {
    const categorizedData: { [key: string]: { [key: string]: number } } = data.reduce((acc, curr) => {
      const { type, zone } = curr;
      if (!acc[zone]) {
        acc[zone] = {};
      }
      if (!acc[zone][type]) {
        acc[zone][type] = 0;
      }
      acc[zone][type]++;
      return acc;
    }, {});

    // Calculate the total number of devices for each zone
    const zoneDeviceCounts = Object.entries(categorizedData).map(([zone, brands]) => ({
      zone,
      totalDevices: Object.values<number>(brands).reduce((sum, count) => sum + count, 0),
    }));

    // Convert the aggregated data to the format required by the chart library
    const chartData = Object.entries(categorizedData).map(([zone, brands]) => ({
      zone,
      labels: Object.keys(brands),
      data: Object.values<number>(brands),
      backgroundColor: Object.keys(brands).map((_, index) => `rgba(${index * 50}, ${index * 100}, ${index * 150}, 0.6)`),
      totalDevices: zoneDeviceCounts.find((zoneData) => zoneData.zone === zone)?.totalDevices || 0,
    }));

    return chartData;
  };

  return (
    <div>
      {deviceChartData.map((zoneData: ChartData) => (
        <div key={zoneData.zone}>
          <h3>{zoneData.zone}</h3>
          <p>Total Devices: {zoneData.totalDevices}</p>
          <Pie
            data={{
              labels: zoneData.labels,
              datasets: [
                {
                  data: zoneData.data,
                  backgroundColor: zoneData.backgroundColor,
                },
              ],
            }}
            options={{
              maintainAspectRatio: true,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default PieChartDemo;






