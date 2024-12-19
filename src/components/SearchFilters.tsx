import React from 'react';
import { Search, Filter } from 'lucide-react';

interface SearchFiltersProps {
  onSearchChange: (value: string) => void;
  onFilterChange: (key: string, value: string) => void;
}

export function SearchFilters({ onSearchChange, onFilterChange }: SearchFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search cars..."
          className="flex-1 outline-none"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          className="border rounded-lg px-3 py-2"
          onChange={(e) => onFilterChange('fuelType', e.target.value)}
        >
          <option value="">All Fuel Types</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <select
          className="border rounded-lg px-3 py-2"
          onChange={(e) => onFilterChange('transmission', e.target.value)}
        >
          <option value="">All Transmissions</option>
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
        </select>

        <select
          className="border rounded-lg px-3 py-2"
          onChange={(e) => onFilterChange('priceRange', e.target.value)}
        >
          <option value="">All Prices</option>
          <option value="0-1000000">Under ₹10 Lakhs</option>
          <option value="1000000-1500000">₹10-15 Lakhs</option>
          <option value="1500000-2000000">₹15-20 Lakhs</option>
          <option value="2000000">Above ₹20 Lakhs</option>
        </select>
      </div>
    </div>
  );
}