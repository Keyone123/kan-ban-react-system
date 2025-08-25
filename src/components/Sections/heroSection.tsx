"use client"

import type React from "react"
import { useState } from "react"
import { Star, Calendar, Play, Heart } from "lucide-react"
import type { Movie } from "../../types"
import Image from "next/image"

interface HeroSectionProps {
  movie: Movie | null
  onToggleFavorite: (id: number) => void
  isFavorite: boolean
}

export const HeroSection: React.FC<HeroSectionProps> = ({ movie, onToggleFavorite, isFavorite }) => {
  const [imageError, setImageError] = useState(false)

  if (!movie) return null

  const title = movie.title || movie.name || ""
  const backdropUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : ""

  return (
    <section className="relative h-[70vh] mb-12 rounded-2xl overflow-hidden group">
      {backdropUrl && !imageError ? (
        <Image
          src={backdropUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          onError={() => setImageError(true)}
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      <div className="relative h-full flex items-center justify-between p-8 lg:p-12">
        <div className="max-w-2xl text-white space-y-6">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent leading-tight">
            {title}
          </h1>

          <p className="text-lg lg:text-xl text-gray-200 leading-relaxed line-clamp-3 max-w-xl">{movie.overview}</p>

          <div className="flex items-center space-x-6">
            <div className="flex items-center bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
              <Star className="w-5 h-5 mr-2 fill-current text-yellow-400" />
              <span className="font-semibold text-white">{movie.vote_average.toFixed(1)}</span>
            </div>
            <div className="flex items-center bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
              <Calendar className="w-5 h-5 mr-2 text-gray-300" />
              <span className="text-white">
                {new Date(movie.release_date || movie.first_air_date || "").getFullYear()}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="group bg-white/90 backdrop-blur-sm text-black px-8 py-4 rounded-xl font-semibold hover:bg-white hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-2xl">
              <Play className="w-6 h-6 mr-3 fill-current group-hover:scale-110 transition-transform" />
              Assistir Agora
            </button>
            <button
              onClick={() => onToggleFavorite(movie.id)}
              className={`group px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center backdrop-blur-sm shadow-xl hover:scale-105 ${
                isFavorite
                  ? "bg-red-500/90 text-white hover:bg-red-500 border border-red-400/50"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
              }`}
            >
              <Heart
                className={`w-6 h-6 mr-3 group-hover:scale-110 transition-transform ${isFavorite ? "fill-current" : ""}`}
              />
              {isFavorite ? "Remover Favorito" : "Adicionar Favorito"}
            </button>
          </div>
        </div>

        <div className="hidden lg:block absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-500/10 to-transparent pointer-events-none" />
      </div>
    </section>
  )
}
