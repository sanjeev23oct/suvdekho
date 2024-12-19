import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../types/review';

interface ReviewSectionProps {
  reviews: Review[];
}

export function ReviewSection({ reviews }: ReviewSectionProps) {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                {review.userName.charAt(0)}
              </div>
              <span className="font-medium">{review.userName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{review.rating}</span>
            </div>
          </div>
          <p className="text-gray-600">{review.comment}</p>
          <div className="mt-2 text-sm text-gray-400">{new Date(review.date).toLocaleDateString()}</div>
        </div>
      ))}
    </div>
  );
}