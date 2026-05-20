import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Users, Star, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useFavorites } from '../hooks/useFavorites';

interface TourCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  duration: string;
  groupSize: string;
  rating: number;
  reviews: number;
  image: string;
  featured?: boolean;
}

export function TourCard({
  id,
  title,
  name,
  location,
  destination,
  price,
  duration,
  durationDays,
  groupSize,
  maxParticipants,
  rating = 4.8,
  reviews = 120,
  image,
  featured = false
}: any) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const tourId = id || 'dummy';
  const favorited = isFavorite(tourId);

  const displayTitle = title || name || 'Tour Vietnam';
  const displayLocation = location || destination || 'Vietnam';
  const displayDuration = duration || (durationDays ? `${durationDays} Days` : '3 Days');
  const displayGroupSize = groupSize || (maxParticipants ? `${maxParticipants} People` : '20 People');
  const displayImage = image || 'https://images.unsplash.com/photo-1562005094-c724030f99bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.0&q=80&w=1080';

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <ImageWithFallback
          src={displayImage}
          alt={displayTitle}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {featured && (
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-orange-500 text-white text-sm rounded-full">
            Featured
          </div>
        )}
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg flex items-center space-x-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm">{rating}</span>
          <span className="text-xs text-gray-600">({reviews})</span>
        </div>
        
        {/* Heart Favorites Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite({ id: tourId, title: displayTitle, location: displayLocation, price, duration: displayDuration, groupSize: displayGroupSize, rating, reviews, image: displayImage, featured });
          }}
          className="absolute bottom-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow hover:bg-white transition-colors z-10"
        >
          <Heart className={`w-5 h-5 transition-colors ${favorited ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {displayTitle}
            </h3>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{displayLocation}</span>
            </div>
          </div>
        </div>

        {/* Tour Info */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1.5" />
            <span>{displayDuration}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1.5" />
            <span>{displayGroupSize}</span>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <span className="text-sm text-gray-600">From</span>
            <div className="text-2xl text-blue-600">${price}</div>
          </div>
          <Link
            to={`/tour/${tourId}`}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
