import { ComparisonFeature } from '../types/car';

export const comparisonFeatures: ComparisonFeature[] = [
  { 
    name: 'Price',
    key: 'price',
    format: (v: number) => `₹${(v / 100000).toFixed(2)} L`
  },
  {
    name: 'Fuel Type',
    key: 'fuelType',
    format: (v: string) => v
  },
  {
    name: 'Transmission',
    key: 'transmission',
    format: (v: string) => v
  },
  {
    name: 'Mileage',
    key: 'mileage',
    format: (v: number) => `${v} kmpl`
  },
  {
    name: 'Engine',
    key: 'engineCC',
    format: (v: number) => `${v} cc`
  },
  {
    name: 'Power',
    key: 'power',
    format: (v: number) => `${v} bhp`
  },
  {
    name: 'Seating',
    key: 'seatingCapacity',
    format: (v: number) => `${v} seats`
  },
  {
    name: 'Year',
    key: 'year',
    format: (v: number) => v.toString()
  }
];