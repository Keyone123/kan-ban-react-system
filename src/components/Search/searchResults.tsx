import React from 'react';
import { Search } from 'lucide-react';
import { Movie } from '../../types';
import { MovieCard } from '../cards/movieCards';

interface SearchResultsProps {
  searchTerm: string;
  searchResults: Movie[];
  searchLoading: boolean;
  favorites: Set<number>;
  onToggleFavorite: (id: number) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  searchTerm,
  searchResults,
  searchLoading,
  favorites,
  onToggleFavorite
}) => (
  <section className="mb-12">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">
      Resultados para {searchTerm} ({searchResults.length})
    </h2>
    {searchLoading ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="w-full h-64 bg-gray-300 rounded-lg animate-pulse"></div>
        ))}
      </div>
    ) : searchResults.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {searchResults.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={favorites.has(movie.id)}
            onToggleFavorite={onToggleFavorite}
            size="normal"
          />
        ))}
      </div>
    ) : (
      <div className="text-center py-12">
        <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-medium text-gray-600 mb-2">Nenhum resultado encontrado</h3>
        <p className="text-gray-500">Tente pesquisar por outro termo</p>
      </div>
    )}
  </section>
);