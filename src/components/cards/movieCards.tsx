"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Heart, Star, Play, Info, Users } from "lucide-react"
import { MovieModal } from "../modal/movie-modal"

interface Movie {
  id: number
  title?: string
  name?: string
  poster_path?: string
  backdrop_path?: string
  release_date?: string
  first_air_date?: string
  vote_average: number
  vote_count: number
  overview?: string
  runtime?: number
  genres?: Array<{ id: number; name: string }>
}

interface MovieCardProps {
  movie: Movie
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
  size?: "small" | "normal" | "large"
  priority?: boolean
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isFavorite,
  onToggleFavorite,
  size = "normal",
  priority = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const title = movie.title || movie.name || "Título não disponível"
  const releaseDate = movie.release_date || movie.first_air_date || ""
  const year = releaseDate ? new Date(releaseDate).getFullYear() : ""

  const sizeClasses = {
    small: "w-40 h-56",
    normal: "w-48 h-72",
    large: "w-56 h-80",
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `/placeholder.svg?height=450&width=300&query=movie poster placeholder`

  const handleCardClick = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <div
        className={`${sizeClasses[size]} flex-shrink-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 group cursor-pointer`}
        onClick={handleCardClick}
      >
        <div className="relative w-full aspect-[2/3] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
          <Image
            src={posterUrl || "/placeholder.svg"}
            alt={`Poster do filme ${title}`}
            fill
            priority={priority}
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = `/placeholder.svg?height=450&width=300&query=movie poster not found`
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex space-x-3">
              <button className="bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </button>
              <button className="bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg">
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(movie.id)
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
              isFavorite ? "bg-red-500 text-white shadow-lg scale-110" : "bg-black/30 text-white hover:bg-black/50"
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>

          <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm flex items-center shadow-lg">
            <Star className="w-4 h-4 mr-1.5 fill-current text-yellow-400" />
            <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col justify-between bg-white dark:bg-gray-800">
          <h3 className="font-bold text-base text-gray-900 dark:text-white line-clamp-2 leading-tight mb-2">{title}</h3>
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">{year}</span>
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              <Users className="w-3 h-3 mr-1" />
              <span className="text-xs font-medium">{movie.vote_count.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <MovieModal movie={movie} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
