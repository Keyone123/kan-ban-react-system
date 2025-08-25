import { useState } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (movieId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(movieId)) {
        newFavorites.delete(movieId);
      } else {
        newFavorites.add(movieId);
      }
      return newFavorites;
    });
  };

  return { favorites, toggleFavorite };
};