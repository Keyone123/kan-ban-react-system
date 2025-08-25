"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react"
import type { Movie } from "../../types"
import { MovieCard } from "../cards/movieCards"
import { LoadingSkeleton } from "../LoadingSkeleton/loadingSkeleton"

interface MovieCarouselProps {
  title: string
  subtitle?: string
  icon: LucideIcon
  movies: Movie[]
  loading: boolean
  favorites: Set<number>
  onToggleFavorite: (id: number) => void
  color: string
  size?: "small" | "normal" | "large"
}

export const MovieCarousel: React.FC<MovieCarouselProps> = ({
  title,
  subtitle,
  icon: Icon,
  movies,
  loading,
  favorites,
  onToggleFavorite,
  color,
  size = "normal",
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = size === "large" ? 280 : size === "normal" ? 240 : 200
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount * 2 : scrollAmount * 2,
        behavior: "smooth",
      })
    }
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    const ref = scrollRef.current
    if (ref) {
      ref.addEventListener("scroll", handleScroll)
      handleScroll() // Check initial state
      return () => ref.removeEventListener("scroll", handleScroll)
    }
  }, [movies])

  if (loading) {
    return (
      <section className="mb-16">
        <div className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/50 backdrop-blur-sm">
          <div className="flex items-center mb-8">
            <div className="relative">
              <div className={`p-3 rounded-xl ${color} shadow-lg animate-pulse`}>
                <div className="w-6 h-6 bg-white/30 rounded"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
            <div className="ml-4">
              <div className="h-8 bg-gradient-to-r from-slate-300 to-slate-200 rounded-lg w-48 mb-3 animate-pulse"></div>
              {subtitle && (
                <div className="h-5 bg-gradient-to-r from-slate-200 to-slate-100 rounded-md w-32 animate-pulse"></div>
              )}
            </div>
          </div>
          <LoadingSkeleton count={6} size={size} />
        </div>
      </section>
    )
  }

  if (!movies.length) return null

  return (
    <section className="mb-16">
      <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/80 to-slate-50/80 border border-slate-200/50 backdrop-blur-sm shadow-lg mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl"></div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative group">
              <div
                className={`p-3 rounded-xl ${color} shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="ml-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                {title}
              </h2>
              {subtitle && <p className="text-slate-600 text-sm font-medium mt-1 opacity-80">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`group relative p-3 rounded-xl transition-all duration-300 ${
                canScrollLeft
                  ? "bg-white/70 hover:bg-white/90 text-slate-700 shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20 hover:scale-105"
                  : "bg-slate-100/50 text-slate-400 cursor-not-allowed backdrop-blur-sm border border-slate-200/30"
              }`}
            >
              <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
              {canScrollLeft && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </button>

            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`group relative p-3 rounded-xl transition-all duration-300 ${
                canScrollRight
                  ? "bg-white/70 hover:bg-white/90 text-slate-700 shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20 hover:scale-105"
                  : "bg-slate-100/50 text-slate-400 cursor-not-allowed backdrop-blur-sm border border-slate-200/30"
              }`}
            >
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              {canScrollRight && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide pb-6 px-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={favorites.has(movie.id)}
              onToggleFavorite={onToggleFavorite}
              size={size}
            />
          ))}
        </div>

        <div className="absolute left-0 top-0 bottom-6 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-6 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
      </div>
    </section>
  )
}
