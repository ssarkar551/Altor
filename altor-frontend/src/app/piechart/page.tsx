// pages/index.js
"use client"
import React, { useState, useEffect } from 'react';
import PieChartComponent from '../../components/ui/piechart'; 
import { DeviceData, CategoryCounts } from '../../types/page'; 
import { processData } from '@/utils/processData'; 
import 'chart.js/auto';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ZoneSelectorPieChart: React.FC = () => {
  const [data, setData] = useState<DeviceData[]>([]);
  const [zone, setZone] = useState<string>('');
  const [availableZones, setAvailableZones] = useState<string[]>([]);

  useEffect(() => {
    fetch('http://20.121.141.248:5000/assignment/feb/sde_fe')
      .then(response => response.json())
      .then(json => {
        setData(json.data);
        const zones = Array.from(new Set(json.data.map((item: DeviceData) => item.zone))) as string[];
        setAvailableZones(zones);
        if (zones.length > 0) {
          setZone(zones[0]); // Default to the first zone
        }
      });
  }, []);

  const handleZoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setZone(event.target.value);
  };

  // Process data for the selected zone
  const deviceBrandData: CategoryCounts = processData(data.filter(item => item.zone === zone), 'device_brand', zone);
  const vehicleBrandData: CategoryCounts = processData(data.filter(item => item.zone === zone), 'vehicle_brand', zone);
  const vehicleCcData: CategoryCounts = processData(data.filter(item => item.zone === zone), 'vehicle_cc', zone);

  return (
    <div>
      <div>
        <label htmlFor="zone-select">Choose a zone:</label>
        <select id="zone-select" value={zone} onChange={handleZoneChange}>
          {availableZones.map(zone => (
            <option key={zone} value={zone}>
              {zone}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
      {zone && (
        <>
          <PieChartComponent data={deviceBrandData} title={`Device Brand Distribution in ${zone}`} />
          <PieChartComponent data={vehicleBrandData} title={`Vehicle Brand Distribution in ${zone}`} />
          <PieChartComponent data={vehicleCcData} title={`Vehicle CC Distribution in ${zone}`} />
        </>
      )}
      </div>
      
    </div>
  );
};

export default ZoneSelectorPieChart;
