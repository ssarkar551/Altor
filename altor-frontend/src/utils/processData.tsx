// utils/processData.ts
import { DeviceData, CategoryCounts } from "@/types/page";


export const processData = (data: DeviceData[], category: keyof DeviceData): CategoryCounts => {
    const categoryCounts: Record<string, number> = {};
  
    data.forEach(item => {
      const key = item[category];
      if (typeof key === 'string') { // Additional check for TypeScript
        categoryCounts[key] = (categoryCounts[key] || 0) + 1;
      }
    });
  
    return {
      labels: Object.keys(categoryCounts),
      values: Object.values(categoryCounts),
    };
  };
  