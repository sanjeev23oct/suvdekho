import React, { useState } from 'react';
import { Car } from './types/car';
import { CarCard } from './components/CarCard';
import { ComparisonFeatures } from './components/comparison/ComparisonFeatures';
import { SearchFilters } from './components/SearchFilters';
import { CarDetail } from './components/CarDetail';
import { filterCars } from './utils/filters';
import { CarFront, Loader } from 'lucide-react';
import { useCars } from './hooks/useCars';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';



function App() {

  ReactGA.initialize('G-0WB4SDDBP6');

  const location = new URL(window.location.href);

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
  }, [location]);



  const { cars, loading, error } = useCars();
  const [selectedCars, setSelectedCars] = useState<Car[]>([]);
  const [selectedCarDetail, setSelectedCarDetail] = useState<Car | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    fuelType: '',
    transmission: '',
    priceRange: '',
  });

  const handleCarSelect = (car: Car) => {
    if (selectedCars.find(c => c.id === car.id)) {
      setSelectedCars(selectedCars.filter(c => c.id !== car.id));
    } else if (selectedCars.length < 3) {
      setSelectedCars([...selectedCars, car]);
    }
  };

  const handleRemoveComparison = (carId: string) => {
    setSelectedCars(selectedCars.filter(car => car.id !== carId));
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const filteredCars = filterCars(cars, {
    fuelType: filters.fuelType,
    transmission: filters.transmission,
    priceRange: filters.priceRange ? {
      min: parseInt(filters.priceRange.split('-')[0]),
      max: parseInt(filters.priceRange.split('-')[1] || '999999999'),
    } : undefined,
  }).filter(car => 
    car.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
    car.model.toLowerCase().includes(filters.search.toLowerCase())
  );

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-2">Failed to load cars data</p>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <CarFront className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Indian Car Comparison</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <SearchFilters
          onSearchChange={(value) => handleFilterChange('search', value)}
          onFilterChange={handleFilterChange}
        />

        {selectedCars.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Comparison</h2>
            <ComparisonFeatures 
              cars={selectedCars}
              onRemoveCar={handleRemoveComparison}
            />
          </section>
        )}

        <section className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Available Cars</h2>
            <span className="text-sm text-gray-600">
              {3 - selectedCars.length} more can be selected
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <div key={car.id} onClick={() => setSelectedCarDetail(car)}>
                  <CarCard
                    car={car}
                    isSelected={selectedCars.some(c => c.id === car.id)}
                    onSelect={(e) => {
                      e.stopPropagation();
                      handleCarSelect(car);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {selectedCarDetail && (
          <CarDetail
            car={selectedCarDetail}
            onClose={() => setSelectedCarDetail(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;