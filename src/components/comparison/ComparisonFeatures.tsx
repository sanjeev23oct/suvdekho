import React from 'react';
import { Car } from '../../types/car';
import { ComparisonTable } from './ComparisonTable';
import { ComparisonChart } from './ComparisonChart';
import { X } from 'lucide-react';

interface ComparisonFeaturesProps {
  cars: Car[];
  onRemoveCar: (carId: string) => void;
}

export function ComparisonFeatures({ cars, onRemoveCar }: ComparisonFeaturesProps) {
  if (cars.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center">
        {cars.map((car) => (
          <div key={car.id} className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-full">
            <span>{car.brand} {car.model}</span>
            <button
              onClick={() => onRemoveCar(car.id)}
              className="p-1 hover:bg-blue-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6">
        <ComparisonTable cars={cars} />
        <ComparisonChart cars={cars} />
      </div>
    </div>
  );
}