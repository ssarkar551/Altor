// pages/dashboard.tsx
"use client"

import { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import 'chart.js/auto';

interface ZoneData{
  zones: { [zone: string]: { [brand: string]: number } };
}

export default function PiechartDemo(){
  const [chartData, setChartData ] = useState<ZoneData>({zones: {}});
  const [selectedZone, setSelectedZone] = useState("All");
  useEffect(() => {
    const fetchData = async() => {
      try{
        const response = await fetch(`http://20.121.141.248:5000/assignment/feb/sde_fe`);
        const json = await response.json();
        const data = json.data;
        
        setChartData({zones: processData(data)});
      } catch(error){
        console.log('Error while fetching data: ', error);
      }
    };

    fetchData()
    
  }, []);

  const processData = (data: any[]) => {
    const categorizedData: any = {
      deviceBrands: {},
      vehicleBrands: {},
      ccDistributions: {},
    };

    data.forEach((item) => {
      const zone = item.zone;
      const deviceBrand = item.device_brand;
      const vehicleBrand = item.vehicle_brand;
      const cc = item.cc; // Assuming you have a field for CC
  
      // Process device brands
      if (!categorizedData.deviceBrands[zone]) {
        categorizedData.deviceBrands[zone] = {};
      }
      if (!categorizedData.deviceBrands[zone][deviceBrand]) {
        categorizedData.deviceBrands[zone][deviceBrand] =  0;
      }
      categorizedData.deviceBrands[zone][deviceBrand]++;
  
      // Process vehicle brands
      if (!categorizedData.vehicleBrands[zone]) {
        categorizedData.vehicleBrands[zone] = {};
      }
      if (!categorizedData.vehicleBrands[zone][vehicleBrand]) {
        categorizedData.vehicleBrands[zone][vehicleBrand] =  0;
      }
      categorizedData.vehicleBrands[zone][vehicleBrand]++;
  
      // Process CC distributions
      if (!categorizedData.ccDistributions[zone]) {
        categorizedData.ccDistributions[zone] = {};
      }
      if (!categorizedData.ccDistributions[zone][cc]) {
        categorizedData.ccDistributions[zone][cc] =  0;
      }
      categorizedData.ccDistributions[zone][cc]++;
    });
  
    return categorizedData;
  }


  
  const transformedData = Object.keys(chartData.zones).map(zone => {
    return {
      zone,
      data: Object.values(chartData.zones[zone]).reduce((acc, count) => acc + count,  0)
    };
  });

  //Transform data for charts
  const transformedDataDeviceBrands = transformedData;;
  const transformedDataVehicleBrands = transformedData;;
  const transformedDataCCDistributions = transformedData;

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i =  0; i <  6; i++) {
      color += letters[Math.floor(Math.random() *  16)];
    }
    return color;
  };

  const generateCOlors = (length: any) => {
    return Array.from({ length}, () => getRandomColor())
  }
  
  // Generate an array of colors based on the number of zones
  const colors = Array.from({ length: transformedData.length }, getRandomColor);
  const options = {
    title: {
      display: true,
      text: 'Device brand distribution over zones',
      fontSize: 20,
    }, 
    legend: {
      display: true,
      position: 'right'
    },
  };
  console.log('data: ', transformedData.map(item => item.zone))
  return (
    <div className="container">
      <Pie data={{
        labels: transformedData.map(item => item.zone),
        datasets: [
          {
            label: 'Device Brands',
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 2,
            data: transformedData.map(item => item.data)
          },
        ],
      }} 
      />
      <Pie data={{
        labels: transformedData.map(item => item.zone),
        datasets: [
          {
            label: 'Vehicle Brands',
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 2,
            data: transformedData.map(item => item.data)
          },
        ],
      }} 
      />
      <Pie data={{
        labels: transformedData.map(item => item.zone),
        datasets: [
          {
            label: 'Vehicle CC',
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 2,
            data: transformedData.map(item => item.data)
          },
        ],
      }} 
      />
    </div>
  )
}




