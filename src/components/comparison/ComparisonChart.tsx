import React from 'react';
import { Car } from '../../types/car';

interface ComparisonChartProps {
  cars: Car[];
}

export function ComparisonChart({ cars }: ComparisonChartProps) {
  const maxPower = Math.max(...cars.map(car => car.power));
  const maxPrice = Math.max(...cars.map(car => car.price));
  const maxMileage = Math.max(...cars.map(car => car.mileage));

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Performance Comparison</h3>
      <div className="space-y-6">
        {cars.map((car) => (
          <div key={car.id} className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-24 text-sm">{car.brand} {car.model}</span>
              <div className="flex-1 space-y-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Power</span>
                    <span>{car.power} bhp</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(car.power / maxPower) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Price</span>
                    <span>₹{(car.price / 100000).toFixed(2)} L</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${(car.price / maxPrice) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Mileage</span>
                    <span>{car.mileage} kmpl</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div
                      className="h-full bg-yellow-500 rounded-full"
                      style={{ width: `${(car.mileage / maxMileage) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}