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

export interface ApiAuthResponse {
  isSuccess: boolean;
  isError: boolean;
  token: string;
  error: string;
}

export interface StripeItem {
  price: string;
  quantity: number;
}

export interface ApiUserProfileDataResponse {
  isSuccess: boolean;
  isError: boolean;
  email: string;
  netflixPlan: "Basic" | "Standard" | "Premium";
}

export interface ApiUpdateNetflixPlanResponse {
  isSuccess: boolean;
  isError: boolean;
  error: string;
}
