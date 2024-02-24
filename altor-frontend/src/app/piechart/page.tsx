// pages/index.js
"use client"
import React, { useEffect, useState } from 'react';
import PieChartComponent from '../../components/ui/piechart';
import { processData } from '../../utils/processData';
import 'chart.js/auto';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the data from your API
    fetch('http://20.121.141.248:5000/assignment/feb/sde_fe')
      .then(response => response.json())
      .then(json => setData(json.data));
  }, []);

  // Assuming you want to aggregate all data, not by zone in this example
  const deviceBrandData = processData(data, 'device_brand');
  const vehicleBrandData = processData(data, 'vehicle_brand');
  const vehicleCcData = processData(data, 'vehicle_cc');

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Device Brand Distribution</h2>
          <PieChartComponent data={deviceBrandData} title="Device Brand" />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Vehicle Brand Distribution</h2>
          <PieChartComponent data={vehicleBrandData} title="Vehicle Brand" />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Vehicle CC Distribution</h2>
          <PieChartComponent data={vehicleCcData} title="Vehicle CC" />
        </div>
      </div>
    </div>
  );
}
