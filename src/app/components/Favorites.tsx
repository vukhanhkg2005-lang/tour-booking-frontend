import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Compass } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { TourCard } from './TourCard';

export function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-10">
          <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500">
            <Heart className="w-6 h-6 fill-red-500" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              My Favorites
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Your personal travel wishlist for upcoming Vietnam trips.
            </p>
          </div>
        </div>

        {/* List Grid */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((tour) => (
              <TourCard key={tour._id || tour.id} id={tour._id || tour.id} {...tour} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center shadow-md border border-gray-100 max-w-2xl mx-auto space-y-6">
            <div className="w-20 h-20 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto text-4xl">
              ♡
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Your Wishlist is Empty</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Explore our catalog of authentic luxury cruises, adventure treks, and ancient heritage packages to save your favorite destinations.
              </p>
            </div>
            <Link 
              to="/tours" 
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
            >
              <Compass className="w-5 h-5 mr-2" />
              Explore All Tours
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
