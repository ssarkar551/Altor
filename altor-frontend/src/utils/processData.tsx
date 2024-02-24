// utils/processData.ts
import { DeviceData, CategoryCounts } from "@/types/page";


// Optionally extend processData to include zone filtering
export const processData = (
    data: DeviceData[],
    category: keyof DeviceData,
    zone: string // Add zone parameter
  ): CategoryCounts => {
    const categoryCounts: Record<string, number> = {};
  
    // Filter data by zone within the function
    data.forEach(item => {
      if (item.zone === zone) { // Check if the item belongs to the selected zone
        const key = item[category];
        if (typeof key === 'string') { // Additional check for TypeScript
          categoryCounts[key] = (categoryCounts[key] || 0) + 1;
        }
      }
    });
  
    return {
      labels: Object.keys(categoryCounts),
      values: Object.values(categoryCounts),
    };
  };
  
  