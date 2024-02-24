import { DeviceData } from '../types/page';

// Function to process data for vehicle brand distribution by zone
export const processVehicleBrandData = (data: DeviceData[], zone: string) => {
  const filteredData = data.filter(item => item.zone === zone);
  const counts: Record<string, number> = {};

  filteredData.forEach(item => {
    counts[item.vehicle_brand] = (counts[item.vehicle_brand] || 0) + 1;
  });

  return {
    labels: Object.keys(counts),
    values: Object.values(counts),
  };
};

// Function to process data for device SDK int distribution by zone
export const processSdkIntData = (data: DeviceData[], zone: string) => {
  const filteredData = data.filter(item => item.zone === zone);
  const counts: Record<string, number> = {};

  filteredData.forEach(item => {
    const sdkIntAsString = `SDK ${item.sdk_int}`; // Convert SDK int to a string to use as a label
    counts[sdkIntAsString] = (counts[sdkIntAsString] || 0) + 1;
  });

  return {
    labels: Object.keys(counts),
    values: Object.values(counts),
  };
};
