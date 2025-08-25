import { LucideIcon } from "lucide-react";

export interface Movie {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  first_air_date?: string;
  vote_average: number;
  genre_ids: number[];
  media_type?: string;
  vote_count: number;
  popularity: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface CarouselSection {
  id: string;
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  endpoint: string;
  color: string;
}