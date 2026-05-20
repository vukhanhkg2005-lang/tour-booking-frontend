import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<any[]>(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        try {
          setFavorites(JSON.parse(stored));
        } catch (e) {
          setFavorites([]);
        }
      } else {
        setFavorites([]);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('favorites-updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favorites-updated', handleStorageChange);
    };
  }, []);

  const saveFavorites = (newFavs: any[]) => {
    setFavorites(newFavs);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavs));
    window.dispatchEvent(new Event('favorites-updated'));
  };

  const addFavorite = (tour: any) => {
    const tourId = tour._id || tour.id;
    if (favorites.some((t) => (t._id || t.id) === tourId)) return;
    saveFavorites([...favorites, tour]);
  };

  const removeFavorite = (tourId: string) => {
    saveFavorites(favorites.filter((t) => (t._id || t.id) !== tourId));
  };

  const isFavorite = (tourId: string) => {
    return favorites.some((t) => (t._id || t.id) === tourId);
  };

  const toggleFavorite = (tour: any) => {
    const tourId = tour._id || tour.id;
    if (isFavorite(tourId)) {
      removeFavorite(tourId);
    } else {
      addFavorite(tour);
    }
  };

  return { favorites, isFavorite, toggleFavorite, removeFavorite };
}
