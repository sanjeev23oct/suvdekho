import React from 'react';
import { Car } from '../types/car';

interface ComparisonTableProps {
  cars: Car[];
}

export function ComparisonTable({ cars }: ComparisonTableProps) {
  const features = [
    { name: 'Price', key: 'price' as const, format: (v: number) => `₹${v.toLocaleString('en-IN')}` },
    { name: 'Fuel Type', key: 'fuelType' as const, format: (v: string) => v },
    { name: 'Transmission', key: 'transmission' as const, format: (v: string) => v },
    { name: 'Mileage', key: 'mileage' as const, format: (v: number) => `${v} kmpl` },
    { name: 'Engine', key: 'engineCC' as const, format: (v: number) => `${v} cc` },
    { name: 'Power', key: 'power' as const, format: (v: number) => `${v} bhp` },
    { name: 'Seating', key: 'seatingCapacity' as const, format: (v: number) => `${v} seats` },
  ];

  if (cars.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-3 bg-gray-100 border"></th>
            {cars.map((car) => (
              <th key={car.id} className="p-3 bg-gray-100 border text-left min-w-[200px]">
                {car.brand} {car.model}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature) => (
            <tr key={feature.key}>
              <td className="p-3 border font-medium bg-gray-50">{feature.name}</td>
              {cars.map((car) => (
                <td key={car.id} className="p-3 border">
                  {feature.format(car[feature.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}