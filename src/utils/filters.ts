import { Car } from '../types/car';

export const filterCars = (
  cars: Car[],
  filters: {
    priceRange?: { min: number; max: number };
    fuelType?: string;
    transmission?: string;
    brand?: string;
  }
) => {
  return cars.filter((car) => {
    const matchesPrice =
      !filters.priceRange ||
      (car.price >= filters.priceRange.min && car.price <= filters.priceRange.max);
    const matchesFuel = !filters.fuelType || car.fuelType === filters.fuelType;
    const matchesTransmission = !filters.transmission || car.transmission === filters.transmission;
    const matchesBrand = !filters.brand || car.brand.toLowerCase().includes(filters.brand.toLowerCase());
    return matchesPrice && matchesFuel && matchesTransmission && matchesBrand;
  });
};