"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { X, Star, Calendar, Clock, Users, Play } from "lucide-react"

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

interface MovieModalProps {
  movie: Movie | null
  isOpen: boolean
  onClose: () => void
}

export const MovieModal: React.FC<MovieModalProps> = ({ movie, isOpen, onClose }) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null)
  const [showTrailer, setShowTrailer] = useState(false)

  useEffect(() => {
    if (isOpen && movie) {
      // Simular busca de trailer - em produção, você faria uma chamada real para a API
      // Para demonstração, vou usar um trailer genérico
      setTrailerKey("dQw4w9WgXcQ") // Rick Roll como placeholder
    }
  }, [isOpen, movie])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen || !movie) return null

  const title = movie.title || movie.name || "Título não disponível"
  const releaseDate = movie.release_date || movie.first_air_date || ""
  const year = releaseDate ? new Date(releaseDate).getFullYear() : ""

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : `/placeholder.svg?height=720&width=1280&query=movie backdrop`

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `/placeholder.svg?height=750&width=500&query=movie poster`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="overflow-y-auto max-h-[90vh]">
          {/* Hero Section */}
          <div className="relative h-80 bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900">
            <Image
              src={backdropUrl || "/placeholder.svg"}
              alt={`Backdrop do filme ${title}`}
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = `/placeholder.svg?height=720&width=1280&query=movie backdrop not found`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Movie Info Overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">{title}</h1>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center bg-yellow-500 text-black px-3 py-1 rounded-full font-semibold">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  {movie.vote_average.toFixed(1)}
                </div>
                {year && (
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Calendar className="w-4 h-4 mr-1" />
                    {year}
                  </div>
                )}
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Users className="w-4 h-4 mr-1" />
                  {movie.vote_count.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Poster */}
              <div className="flex-shrink-0">
                <div className="w-64 h-96 relative bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={posterUrl || "/placeholder.svg"}
                    alt={`Poster do filme ${title}`}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `/placeholder.svg?height=750&width=500&query=movie poster not found`
                    }}
                  />
                </div>
              </div>

              {/* Details */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Sinopse</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {movie.overview || "Sinopse não disponível para este filme."}
                </p>

                {/* Genres */}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Gêneros</h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Runtime */}
                {movie.runtime && (
                  <div className="mb-6">
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="font-medium">{movie.runtime} minutos</span>
                    </div>
                  </div>
                )}

                {/* Trailer Section */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Trailer</h3>
                  {!showTrailer ? (
                    <button
                      onClick={() => setShowTrailer(true)}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center transition-colors duration-200"
                    >
                      <Play className="w-5 h-5 mr-2 fill-current" />
                      Assistir Trailer
                    </button>
                  ) : (
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                      {trailerKey ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                          title={`Trailer de ${title}`}
                          className="w-full h-full"
                          allowFullScreen
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white">
                          <p>Trailer não disponível</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
