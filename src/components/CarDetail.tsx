import React from 'react';
import { Car } from '../types/car';
import { reviews } from '../data/reviews';
import { ReviewSection } from './ReviewSection';
import { IndianRupee, Fuel, Gauge, Power, Users, Calendar, Ruler, Shield, Box, Droplet, Zap } from 'lucide-react';

interface CarDetailProps {
  car: Car;
  onClose: () => void;
}

export function CarDetail({ car, onClose }: CarDetailProps) {
  const carReviews = reviews.filter((review) => review.carId === car.id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={car.imageUrl} 
            alt={`${car.brand} ${car.model}`}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{car.brand} {car.model}</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6 border-b pb-4">
            <div className="flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-blue-600" />
              <span>₹{car.price.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>{car.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <Fuel className="w-5 h-5 text-blue-600" />
              <span>{car.fuelType}</span>
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-blue-600" />
              <span>{car.mileage} kmpl</span>
            </div>
            <div className="flex items-center gap-2">
              <Power className="w-5 h-5 text-blue-600" />
              <span>{car.power} bhp</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span>{car.seatingCapacity} seats</span>
            </div>
          </div>

          {car.dimensions && (
            <div className="mb-6 border-b pb-4">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-blue-600" />
                Dimensions
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">Length:</span>
                  <span className="ml-2">{car.dimensions.length} mm</span>
                </div>
                <div>
                  <span className="text-gray-600">Width:</span>
                  <span className="ml-2">{car.dimensions.width} mm</span>
                </div>
                <div>
                  <span className="text-gray-600">Height:</span>
                  <span className="ml-2">{car.dimensions.height} mm</span>
                </div>
                <div>
                  <span className="text-gray-600">Wheelbase:</span>
                  <span className="ml-2">{car.dimensions.wheelbase} mm</span>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-6 border-b pb-4">
            {car.torque && (
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <span>{car.torque} Nm</span>
              </div>
            )}
            {car.bootSpace && (
              <div className="flex items-center gap-2">
                <Box className="w-5 h-5 text-blue-600" />
                <span>{car.bootSpace}L boot space</span>
              </div>
            )}
            {car.fuelTankCapacity && (
              <div className="flex items-center gap-2">
                <Droplet className="w-5 h-5 text-blue-600" />
                <span>{car.fuelTankCapacity}L fuel tank</span>
              </div>
            )}
          </div>

          {car.safetyFeatures && car.safetyFeatures.length > 0 && (
            <div className="mb-6 border-b pb-4">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Safety Features
              </h3>
              <ul className="list-disc list-inside grid grid-cols-2 gap-2">
                {car.safetyFeatures.map((feature, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-400">{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Reviews</h3>
          <ReviewSection reviews={carReviews} />
        </div>
      </div>
    </div>
  );
}
