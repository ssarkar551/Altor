// types/index.ts

export interface DeviceData {
    device_brand: string;
    model: string;
    processor: string;
    sdk_int: number;
    username: string;
    vehicle_brand: string;
    vehicle_cc: string;
    vehicle_type: string;
    zone: string;
  }
  
  export interface CategoryCounts {
    labels: string[];
    values: number[];
  }
  