import React from 'react';

export const Footer: React.FC = () => (
  <footer className="text-center py-12 border-t border-gray-200 mt-16">
    <div className="mb-4">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">CineHub</h3>
      <p className="text-gray-600">
        Descubra, favorite e acompanhe os melhores filmes e séries
      </p>
    </div>
    <p className="text-gray-500 text-sm">
      Dados fornecidos por{' '}
      <a 
        href="https://www.themoviedb.org/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        The Movie Database (TMDb)
      </a>
    </p>
  </footer>
);