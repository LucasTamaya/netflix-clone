export interface MovieResult {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  title: string;
  name?: string;
  origin_country: string[];
  original_language: string;
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: string;
  vote_count: string;
}

export interface TmdbApiMovieResponse {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
}

export interface ApiResponse {
  isSuccess: boolean;
  error?: string;
}

export interface StripeItem {
  price: string;
  quantity: number;
}

export interface ApiUserProfileDataResponse {
  email: string;
  netflixPlan: "Basic" | "Standard" | "Premium";
}
