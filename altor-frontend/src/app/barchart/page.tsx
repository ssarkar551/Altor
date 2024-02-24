"use client"
import React, { useState, useEffect } from 'react';
import BarChartComponent from '../../components/ui/barchart';
import { DeviceData } from '../../types/page';
import { processVehicleBrandData, processSdkIntData } from '../../utils/processBarChartData';

const ZoneDashboard: React.FC = () => {
  const [data, setData] = useState<DeviceData[]>([]);
  const [zone, setZone] = useState<string>('Zone_1'); // Default zone
  const [availableZones, setAvailableZones] = useState<string[]>([]);

  useEffect(() => {
    // Fetch the data from your API
    fetch('http://20.121.141.248:5000/assignment/feb/sde_fe')
      .then(response => response.json())
      .then(json => {
        setData(json.data);
        // Extract unique zones from the data
        const zones: string[] = Array.from(new Set(json.data.map((item: DeviceData) => item.zone))) as string[];
        setAvailableZones(zones);
        setZone(zones[0]); // Set the default zone to the first found
      });
  }, []);

  const vehicleBrandData = processVehicleBrandData(data, zone);
  const sdkIntData = processSdkIntData(data, zone);

  return (
    <div>
      <div>
        <label htmlFor="zone-select">Choose a zone:</label>
        <select
          id="zone-select"
          value={zone}
          onChange={(e) => setZone(e.target.value)}
        >
          {availableZones.map((zone) => (
            <option key={zone} value={zone}>
              {zone}
            </option>
          ))}
        </select>
      </div>
      <h2>Vehicle Brand Distribution in {zone}</h2>
      <BarChartComponent data={vehicleBrandData} title="Vehicle Brands" />
      <h2>Device SDK Distribution in {zone}</h2>
      <BarChartComponent data={sdkIntData} title="SDK Ints" />
    </div>
  );
};

export default ZoneDashboard;
