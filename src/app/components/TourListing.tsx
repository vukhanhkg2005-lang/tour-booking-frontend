import React, { useState, useEffect, useMemo } from 'react';
import { FilterSidebar } from './FilterSidebar';
import { TourCard } from './TourCard';
import { SearchBar } from './SearchBar';
import { SlidersHorizontal, Grid, List, X } from 'lucide-react';
import api from '../services/api';

export function TourListing() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [sortOption, setSortOption] = useState<string>('Popular');
  const [activeFilters, setActiveFilters] = useState<any>({
    priceRange: [0, 3000],
    duration: [],
    tourType: [],
    groupSize: [],
    minRating: null
  });

  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters);
  };

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await api.get('/tours');
        const data = response.data.data || response.data;
        const tourArray = Array.isArray(data) ? data : [];
        
        // Data Enrichment
        const enrichedTours = tourArray.map((tour: any, index: number) => {
          const rating = parseFloat((4.4 + (index % 7) * 0.1).toFixed(1));
          const reviews = 50 + (index % 21) * 10;
          
          const titleText = (tour.title || tour.name || '').toLowerCase();
          let tourType = 'Nature & Wildlife';
          if (titleText.includes('trekking') || titleText.includes('loop') || titleText.includes('hike') || titleText.includes('adventure') || titleText.includes('motorcycle') || titleText.includes('hà giang')) {
            tourType = 'Adventure';
          } else if (titleText.includes('cruise') || titleText.includes('beach') || titleText.includes('island') || titleText.includes('bay') || titleText.includes('hạ long') || titleText.includes('nha trang') || titleText.includes('phú quốc')) {
            tourType = 'Beach & Island';
          } else if (titleText.includes('citadel') || titleText.includes('ancient') || titleText.includes('cultural') || titleText.includes('huế') || titleText.includes('hội an') || titleText.includes('tràng an')) {
            tourType = 'Cultural';
          } else if (titleText.includes('city') || titleText.includes('hà nội') || titleText.includes('sài gòn') || titleText.includes('tphcm') || titleText.includes('hồ chí minh')) {
            tourType = 'City Tour';
          } else if (titleText.includes('thác') || titleText.includes('vườn quốc gia') || titleText.includes('hang động') || titleText.includes('nature') || titleText.includes('phong nha')) {
            tourType = 'Nature & Wildlife';
          } else if (titleText.includes('food') || titleText.includes('culinary') || titleText.includes('ẩm thực') || titleText.includes('miền tây')) {
            tourType = 'Food & Culinary';
          } else {
            const types = ['Adventure', 'Cultural', 'Beach & Island', 'City Tour', 'Nature & Wildlife', 'Food & Culinary'];
            tourType = types[index % types.length];
          }

          return {
            ...tour,
            rating: tour.rating || rating,
            reviews: tour.reviews || reviews,
            tourType: tour.tourType || tourType
          };
        });

        setTours(enrichedTours);
      } catch (error) {
        console.error("Failed to fetch tours", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  // Filter and sort the enriched tours using useMemo
  const filteredAndSortedTours = useMemo(() => {
    let result = [...tours];

    // 1. Filter by price
    result = result.filter(tour => {
      const price = tour.price || 0;
      return price >= activeFilters.priceRange[0] && price <= activeFilters.priceRange[1];
    });

    // 2. Filter by duration
    if (activeFilters.duration && activeFilters.duration.length > 0) {
      result = result.filter(tour => {
        const days = tour.durationDays || (tour.duration ? parseInt(tour.duration) : 3);
        return activeFilters.duration.some((opt: string) => {
          if (opt === '1-2 Days') return days >= 1 && days <= 2;
          if (opt === '3-4 Days') return days >= 3 && days <= 4;
          if (opt === '5-7 Days') return days >= 5 && days <= 7;
          if (opt === '7+ Days') return days > 7;
          return false;
        });
      });
    }

    // 3. Filter by tour type
    if (activeFilters.tourType && activeFilters.tourType.length > 0) {
      result = result.filter(tour => {
        return activeFilters.tourType.includes(tour.tourType);
      });
    }

    // 4. Filter by group size
    if (activeFilters.groupSize && activeFilters.groupSize.length > 0) {
      result = result.filter(tour => {
        const size = tour.maxParticipants || (tour.groupSize ? parseInt(tour.groupSize) : 10);
        return activeFilters.groupSize.some((opt: string) => {
          if (opt === 'Small (1-10)') return size >= 1 && size <= 10;
          if (opt === 'Medium (11-20)') return size >= 11 && size <= 20;
          if (opt === 'Large (21+)') return size >= 21;
          if (opt === 'Private') return size <= 2 || (tour.groupSize && tour.groupSize.toLowerCase().includes('private')) || (tour.title && tour.title.toLowerCase().includes('private'));
          return false;
        });
      });
    }

    // 5. Filter by rating
    if (activeFilters.minRating !== null) {
      result = result.filter(tour => {
        const rating = tour.rating || 0;
        return rating >= activeFilters.minRating;
      });
    }

    // 6. Sort
    result.sort((a, b) => {
      if (sortOption === 'Price: Low to High') {
        return (a.price || 0) - (b.price || 0);
      }
      if (sortOption === 'Price: High to Low') {
        return (b.price || 0) - (a.price || 0);
      }
      if (sortOption === 'Rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      if (sortOption === 'Duration') {
        const daysA = a.durationDays || (a.duration ? parseInt(a.duration) : 3);
        const daysB = b.durationDays || (b.duration ? parseInt(b.duration) : 3);
        return daysA - daysB;
      }
      // Default to 'Popular' (by review count descending)
      return (b.reviews || 0) - (a.reviews || 0);
    });

    return result;
  }, [tours, activeFilters, sortOption]);

  // Reset currentPage to 1 when filters or sorting change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilters, sortOption]);

  const totalTours = filteredAndSortedTours.length;
  const totalPages = Math.ceil(totalTours / itemsPerPage);
  const fromIndex = totalTours === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const toIndex = Math.min(currentPage * itemsPerPage, totalTours);
  const displayedTours = filteredAndSortedTours.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl text-white mb-6">
            Explore Vietnam Tours
          </h1>
          <SearchBar variant="compact" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="w-full py-3 px-4 bg-white rounded-lg shadow-md flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5 text-blue-600" />
              <span>Filters</span>
            </button>
          </div>

          {/* Mobile Filter Overlay */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div 
                className="absolute inset-0 bg-black/50"
                onClick={() => setMobileFiltersOpen(false)}
              ></div>
              <div className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto">
                <div className="p-4">
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <FilterSidebar onFilterChange={handleFilterChange} />
                </div>
              </div>
            </div>
          )}

          {/* Tours Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-gray-900 font-medium">
                  Showing <span className="font-semibold text-blue-600">{fromIndex} - {toIndex}</span> of <span className="font-semibold text-blue-600">{totalTours}</span> available tours
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort */}
                <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white text-gray-900 cursor-pointer"
                >
                  <option value="Popular">Sort by: Popular</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                  <option value="Rating">Rating</option>
                  <option value="Duration">Duration</option>
                </select>

                {/* View Mode */}
                <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tours Grid/List */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {loading ? (
                <div className="col-span-full text-center py-12 text-gray-500">
                  Loading tours...
                </div>
              ) : displayedTours.length > 0 ? (
                displayedTours.map((tour) => (
                  <TourCard key={tour._id || tour.id} id={tour._id || tour.id} {...tour} />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No tours found matching your criteria.
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                <button
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    currentPage === 1
                      ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 active:scale-95'
                  }`}
                >
                  Trước
                </button>
                
                {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all duration-200 active:scale-95 ${
                      currentPage === page
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => {
                    if (currentPage < totalPages) {
                      setCurrentPage(currentPage + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    currentPage === totalPages || totalPages === 0
                      ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 active:scale-95'
                  }`}
                >
                  Sau
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
