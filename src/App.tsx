import React, { useState, useEffect } from 'react';
import { Car } from './types/car';
import { CarCard } from './components/CarCard';
import { ComparisonFeatures } from './components/comparison/ComparisonFeatures';
import { SearchFilters } from './components/SearchFilters';
import { CarDetail } from './components/CarDetail';
import { filterCars } from './utils/filters';
import { CarFront, Loader } from 'lucide-react';
import { useCars } from './hooks/useCars';
import ReactGA from 'react-ga4';
import ReactPaginate from 'react-paginate';

function App() {
  ReactGA.initialize('G-M0LLQV71T9');
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
  const [currentPage, setCurrentPage] = useState(0);
  const carsPerPage = 9;

  const handleCarSelect = (car: Car) => {
    if (selectedCars.find((c) => c.id === car.id)) {
      setSelectedCars(selectedCars.filter((c) => c.id !== car.id));
    } else if (selectedCars.length < 3) {
      setSelectedCars([...selectedCars, car]);
    }
  };

  const handleRemoveComparison = (carId: string) => {
    setSelectedCars(selectedCars.filter((car) => car.id !== carId));
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
    setCurrentPage(0);
  };

  const filteredCars = filterCars(cars, {
    fuelType: filters.fuelType,
    transmission: filters.transmission,
    priceRange: filters.priceRange
      ? {
          min: parseInt(filters.priceRange.split('-')[0]),
          max: parseInt(filters.priceRange.split('-')[1] || '999999999'),
        }
      : undefined,
  }).filter((car) =>
    car.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
    car.model.toLowerCase().includes(filters.search.toLowerCase())
  );

  console.log('filteredCars length:', filteredCars.length); 

  const offset = currentPage * carsPerPage;
  const pageCount = Math.ceil(filteredCars.length / carsPerPage);
  const paginatedCars = filteredCars.slice(offset, offset + carsPerPage);

  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected);
  };

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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-lg p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="SuvWaale.webp" alt="SUV Waale Logo" className="h-8 w-auto" /> 
            <h1 className="text-2xl font-bold text-gray-900">SUV Waale</h1>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-gray-700 hover:text-gray-900">Home</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900">About</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 flex-grow">
        <SearchFilters
          onSearchChange={(value) => handleFilterChange('search', value)}
          onFilterChange={handleFilterChange}
        />

        {selectedCars.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Comparison
            </h2>
            <ComparisonFeatures
              cars={selectedCars}
              onRemoveCar={handleRemoveComparison}
            />
          </section>
        )}

        <section className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Available Cars
            </h2>
            <span className="text-sm text-gray-600">
              {3 - selectedCars.length} more can be selected
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedCars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    isSelected={selectedCars.some((c) => c.id === car.id)}
                    onSelect={(e) => {
                      e.stopPropagation();
                      handleCarSelect(car);
                    }}
                  />
                ))}
              </div>
              <ReactPaginate
                previousLabel={'<<'}
                nextLabel={'>>'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination flex justify-center mt-4'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
              />
            </>
          )}
        </section>

        {selectedCarDetail && (
          <CarDetail car={selectedCarDetail} onClose={() => setSelectedCarDetail(null)} />
        )}
      </main>
      <footer className="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
