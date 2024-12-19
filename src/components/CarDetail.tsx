import React from 'react';
import { Car } from '../types/car';
import { reviews } from '../data/reviews';
import { ReviewSection } from './ReviewSection';
import { IndianRupee, Fuel, Gauge, Power, Users, Calendar } from 'lucide-react';

interface CarDetailProps {
  car: Car;
  onClose: () => void;
}

export function CarDetail({ car, onClose }: CarDetailProps) {
  const carReviews = reviews.filter((review) => review.carId === car.id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={car.imageUrl} 
            alt={`${car.brand} ${car.model}`}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{car.brand} {car.model}</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
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

          <h3 className="text-xl font-semibold mb-4">Reviews</h3>
          <ReviewSection reviews={carReviews} />
        </div>
      </div>
    </div>
  );
}