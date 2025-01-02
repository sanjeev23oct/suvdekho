export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Manual' | 'Automatic';
  mileage: number;
  engineCC: number;
  power: number;
  torque?: number;
  seatingCapacity: number;
  imageUrl: string;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    wheelbase: number;
  };
  groundClearance?: number;
  bootSpace?: number;
  fuelTankCapacity?: number;
  safetyFeatures?: string[];
}

export interface ComparisonFeature {
  name: string;
  key: keyof Car;
  format: (value: any) => string;
}
