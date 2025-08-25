/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Search, Star } from 'lucide-react';
import { Movie } from '../../types';
import { API_CONFIG } from '../../config/api';

interface SearchHeaderProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  searchResults: Movie[];
  searchLoading: boolean;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({ 
  searchTerm, 
  onSearch,
  searchResults,
  searchLoading
}) => (
  <div className="relative mb-8">
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Pesquisar filmes, séries, animes..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm"
      />
    </div>
    
    {searchTerm.trim() && (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
        {searchLoading ? (
          <div className="p-4 text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Buscando...</p>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="p-2">
            {searchResults.slice(0, 8).map((movie) => (
              <div key={movie.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <img
                  src={movie.poster_path ? `${API_CONFIG.IMAGE_BASE_URL}${movie.poster_path}` : '/api/placeholder/50/75'}
                  alt={movie.title || movie.name}
                  className="w-12 h-16 object-cover rounded mr-3"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{movie.title || movie.name}</h4>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Star className="w-3 h-3 mr-1 fill-current text-yellow-400" />
                    {movie.vote_average.toFixed(1)}
                    <span className="mx-2">•</span>
                    {new Date(movie.release_date || movie.first_air_date || '').getFullYear()}
                  </div>
                </div>
              </div>
            ))}
            {searchResults.length > 8 && (
              <div className="p-3 text-center text-gray-600 text-sm border-t">
                +{searchResults.length - 8} mais resultados
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-600">
            <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Nenhum resultado encontrado</p>
          </div>
        )}
      </div>
    )}
  </div>
);