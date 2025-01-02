import React from 'react';
import { Car } from '../types/car';
import { IndianRupee, Fuel, Gauge, Car as CarIcon, Plus, Check } from 'lucide-react';

interface CarCardProps {
  car: Car;
  isSelected: boolean;
  onSelect: (e: React.MouseEvent) => void;
  onShowDetail: (car: Car) => void;
}

export function CarCard({ car, isSelected, onSelect, onShowDetail }: CarCardProps) {
  return (
    <div 
      className={`relative rounded-lg overflow-hidden shadow-lg transition-all duration-300 group hover:shadow-xl cursor-pointer bg-white dark:bg-gray-800 ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={() => onShowDetail(car)}
    >
      <img 
        src={car.imageUrl} 
        alt={`${car.brand} ${car.model}`}
        className="w-full h-48 object-cover"
      />
      
      <button
        onClick={onSelect}
        className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
          isSelected 
            ? 'bg-blue-500 text-white'
            : 'bg-white/90 text-gray-600 opacity-0 group-hover:opacity-100'
        }`}
      >
        {isSelected ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
      </button>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{car.brand} {car.model}</h3>
        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">₹{(car.price / 100000).toFixed(2)} L</span>
          </div>
          <div className="flex items-center gap-2">
            <Fuel className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">{car.mileage} kmpl</span>
          </div>
          <div className="flex items-center gap-2">
            <CarIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">{car.transmission}</span>
          </div>
        </div>
      </div>

      {isSelected && (
        <div className="absolute bottom-0 inset-x-0 bg-blue-500 text-white text-center py-2 text-sm">
          Added to comparison
        </div>
      )}
    </div>
  );
}
