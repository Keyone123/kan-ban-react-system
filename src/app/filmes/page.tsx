'use client'

import { MovieCarousel } from "@/components/Carousel/movieCarousel";
import { Footer } from "@/components/Footer/footer";
import { Header } from "@/components/Header/header";
import { SearchHeader } from "@/components/Search/searchHeader";
import { SearchResults } from "@/components/Search/searchResults";
import { HeroSection } from "@/components/Sections/heroSection";
import { StatsSection } from "@/components/Sections/statsSection";
import { useAPI } from "@/hooks/useAPI";
import { useFavorites } from "@/hooks/useFavorites";
import { useSearch } from "@/hooks/useSearch";
import { CarouselSection } from "@/types";
import { Award, Clock, Film, Globe, MoveIcon, Pencil, Star, TrendingUp, Tv, Zap } from "lucide-react";
import { useState } from "react";

export default function CineHubApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchResults, searchLoading } = useSearch(searchTerm);
  const { favorites, toggleFavorite } = useFavorites();

  // Define carousel sections
  const sections: CarouselSection[] = [
    { 
      id: 'trending', 
      title: 'Tendências da Semana', 
      subtitle: 'O que todo mundo está assistindo',
      icon: TrendingUp, 
      endpoint: '/trending/all/week', 
      color: 'bg-gradient-to-r from-red-500 to-pink-500' 
    },
    { 
      id: 'popular-movies', 
      title: 'Filmes Populares', 
      subtitle: 'Os filmes mais assistidos do momento',
      icon: Film, 
      endpoint: '/movie/popular', 
      color: 'bg-gradient-to-r from-blue-500 to-indigo-500' 
    },
    { 
      id: 'popular-tv', 
      title: 'Séries Populares', 
      subtitle: 'Séries que você não pode perder',
      icon: Tv, 
      endpoint: '/tv/popular', 
      color: 'bg-gradient-to-r from-purple-500 to-violet-500' 
    },
    { 
      id: 'upcoming', 
      title: 'Próximos Lançamentos', 
      subtitle: 'Filmes que estão chegando aos cinemas',
      icon: Clock, 
      endpoint: '/movie/upcoming', 
      color: 'bg-gradient-to-r from-green-500 to-emerald-500' 
    },
    { 
      id: 'top-rated-movies', 
      title: 'Filmes Mais Bem Avaliados', 
      subtitle: 'A nata do cinema mundial',
      icon: Award, 
      endpoint: '/movie/top_rated', 
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500' 
    },
    { 
      id: 'top-rated-tv', 
      title: 'Séries Mais Bem Avaliadas', 
      subtitle: 'As séries com melhores críticas',
      icon: Star, 
      endpoint: '/tv/top_rated', 
      color: 'bg-gradient-to-r from-cyan-500 to-blue-500' 
    },
    { 
      id: 'anime', 
      title: 'Animes Populares', 
      subtitle: 'O melhor da animação japonesa',
      icon: Zap, 
      endpoint: '/discover/tv?with_genres=16&with_origin_country=JP', 
      color: 'bg-gradient-to-r from-pink-500 to-rose-500' 
    },
    { 
      id: 'action-movies', 
      title: 'Filmes de Ação', 
      subtitle: 'Adrenalina pura',
      icon: Pencil, 
      endpoint: '/discover/movie?with_genres=28', 
      color: 'bg-gradient-to-r from-red-600 to-red-700' 
    },
    { 
      id: 'documentaries', 
      title: 'Documentários', 
      subtitle: 'Histórias reais e fascinantes',
      icon: Globe, 
      endpoint: '/discover/movie?with_genres=99', 
      color: 'bg-gradient-to-r from-teal-500 to-cyan-500' 
    },
    { 
      id: 'now-playing', 
      title: 'Em Cartaz', 
      subtitle: 'Nos cinemas agora',
      icon: MoveIcon, 
      endpoint: '/movie/now_playing', 
      color: 'bg-gradient-to-r from-indigo-500 to-purple-500' 
    }
  ];

  // API calls for all sections
  const apiResults = sections.map(section => 
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAPI(section.endpoint, [])
  );

  // Get hero movie (first trending movie)
  const heroMovie = apiResults[0]?.data?.[0] || null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <SearchHeader 
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          searchResults={searchResults}
          searchLoading={searchLoading}
        />

        <StatsSection favorites={favorites} />

        {!searchTerm.trim() && heroMovie && (
          <HeroSection 
            movie={heroMovie}
            onToggleFavorite={toggleFavorite}
            isFavorite={favorites.has(heroMovie.id)}
          />
        )}

        {!searchTerm.trim() && sections.map((section, index) => (
          <MovieCarousel
            key={section.id}
            title={section.title}
            subtitle={section.subtitle}
            icon={section.icon}
            movies={apiResults[index]?.data || []}
            loading={apiResults[index]?.loading || false}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            color={section.color}
            size={index === 0 ? 'large' : index < 3 ? 'normal' : 'small'}
          />
        ))}

        {searchTerm.trim() && (
          <SearchResults
            searchTerm={searchTerm}
            searchResults={searchResults}
            searchLoading={searchLoading}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}

        <Footer />
      </div>
    </div>
  );
}