import { useState, useEffect } from 'react';
import { Movie } from '../types';
import { API_CONFIG } from '../config/api';

export const useSearch = (searchTerm: string) => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const searchMovies = async () => {
      if (!searchTerm.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        setSearchLoading(true);
        const response = await fetch(
          `${API_CONFIG.BASE_URL}/search/multi?api_key=${API_CONFIG.API_KEY}&language=pt-BR&query=${encodeURIComponent(searchTerm)}`
        );
        const data = await response.json();
        setSearchResults(data.results || []);
      } catch (error) {
        console.error('Erro na pesquisa:', error);
      } finally {
        setSearchLoading(false);
      }
    };

    const timeoutId = setTimeout(searchMovies, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return { searchResults, searchLoading };
};