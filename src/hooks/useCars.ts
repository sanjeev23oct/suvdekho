import { useState, useEffect } from 'react';
import { Car } from '../types/car';
import { fetchCars } from '../services/carApi';

export function useCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCars() {
      try {
        const data = await fetchCars();
        setCars(data);
      } catch (err) {
        setError('Failed to fetch cars data');
        console.error('Error loading cars:', err);
      } finally {
        setLoading(false);
      }
    }

    loadCars();
  }, []);

  return { cars, loading, error };
}