import { Car } from '../types/car';
import { cars as localCars } from '../data/cars';

// Simulate API fetch with local data
export async function fetchCars(): Promise<Car[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return localCars;
}