import React, { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

interface FilterSidebarProps {
  onFilterChange?: (filters: any) => void;
}

export function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [duration, setDuration] = useState<string[]>([]);
  const [tourType, setTourType] = useState<string[]>([]);
  const [groupSize, setGroupSize] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number | null>(null);

  const handleCheckbox = (value: string, currentState: string[], setState: Function) => {
    if (currentState.includes(value)) {
      setState(currentState.filter(item => item !== value));
    } else {
      setState([...currentState, value]);
    }
  };

  const clearFilters = () => {
    setPriceRange([0, 3000]);
    setDuration([]);
    setTourType([]);
    setGroupSize([]);
    setMinRating(null);
    onFilterChange?.({
      priceRange: [0, 3000],
      duration: [],
      tourType: [],
      groupSize: [],
      minRating: null
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl text-gray-900">Filters</h3>
        </div>
        <button
          onClick={clearFilters}
          className="text-sm text-orange-600 hover:text-orange-700 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h4 className="text-gray-900 mb-4">Price Range</h4>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="3000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full accent-blue-600"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">${priceRange[0]}</span>
            <span className="text-blue-600">${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Duration */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h4 className="text-gray-900 mb-4">Duration</h4>
        <div className="space-y-3">
          {['1-2 Days', '3-4 Days', '5-7 Days', '7+ Days'].map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={duration.includes(option)}
                onChange={() => handleCheckbox(option, duration, setDuration)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-600"
              />
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Tour Type */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h4 className="text-gray-900 mb-4">Tour Type</h4>
        <div className="space-y-3">
          {['Adventure', 'Cultural', 'Beach & Island', 'City Tour', 'Nature & Wildlife', 'Food & Culinary'].map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={tourType.includes(option)}
                onChange={() => handleCheckbox(option, tourType, setTourType)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-600"
              />
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Group Size */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h4 className="text-gray-900 mb-4">Group Size</h4>
        <div className="space-y-3">
          {['Small (1-10)', 'Medium (11-20)', 'Large (21+)', 'Private'].map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={groupSize.includes(option)}
                onChange={() => handleCheckbox(option, groupSize, setGroupSize)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-600"
              />
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h4 className="text-gray-900 mb-4">Minimum Rating</h4>
        <div className="space-y-3">
          {[5, 4, 3, 2].map((rating) => (
            <label key={rating} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="radio"
                name="rating"
                checked={minRating === rating}
                onChange={() => setMinRating(rating)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-600"
              />
              <div className="flex items-center space-x-1">
                {[...Array(rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
                {[...Array(5 - rating)].map((_, i) => (
                  <span key={i} className="text-gray-300">★</span>
                ))}
                <span className="text-gray-700 ml-2">& Up</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <button 
        onClick={() => onFilterChange?.({ priceRange, duration, tourType, groupSize, minRating })}
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
      >
        Apply Filters
      </button>
    </div>
  );
}
