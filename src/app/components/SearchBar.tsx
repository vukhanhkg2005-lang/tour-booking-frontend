import React from 'react';
import { MapPin, Calendar, DollarSign, Search } from 'lucide-react';

interface SearchBarProps {
  variant?: 'hero' | 'compact';
}

export function SearchBar({ variant = 'hero' }: SearchBarProps) {
  return (
    <div className={`bg-white rounded-xl shadow-2xl ${variant === 'hero' ? 'p-6' : 'p-4'}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Destination Input */}
        <div className="relative">
          <label className="block text-sm text-gray-600 mb-2">Destination</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600" />
            <input
              type="text"
              placeholder="Ha Long Bay, Da Nang..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Departure Date Input */}
        <div className="relative">
          <label className="block text-sm text-gray-600 mb-2">Departure Date</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600" />
            <input
              type="date"
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Price Range Input */}
        <div className="relative">
          <label className="block text-sm text-gray-600 mb-2">Price Range</label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600" />
            <select className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all appearance-none bg-white">
              <option value="">All Prices</option>
              <option value="0-500">$0 - $500</option>
              <option value="500-1000">$500 - $1,000</option>
              <option value="1000-2000">$1,000 - $2,000</option>
              <option value="2000+">$2,000+</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center space-x-2 shadow-lg">
            <Search className="w-5 h-5" />
            <span>Search Tours</span>
          </button>
        </div>
      </div>
    </div>
  );
}
