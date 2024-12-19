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
  seatingCapacity: number;
  imageUrl: string;
}

export interface ComparisonFeature {
  name: string;
  key: keyof Car;
  format: (value: any) => string;
}