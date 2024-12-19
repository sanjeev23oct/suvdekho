import React from 'react';
import { Car } from '../../types/car';
import { comparisonFeatures } from '../../utils/comparisonFeatures';

interface ComparisonTableProps {
  cars: Car[];
}

export function ComparisonTable({ cars }: ComparisonTableProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4">Detailed Comparison</h3>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left py-2">Feature</th>
            {cars.map((car) => (
              <th key={car.id} className="text-left py-2 px-4">
                {car.brand} {car.model}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonFeatures.map((feature) => (
            <tr key={feature.key} className="border-t">
              <td className="py-2 font-medium">{feature.name}</td>
              {cars.map((car) => (
                <td key={car.id} className="py-2 px-4">
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