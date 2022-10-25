import axios from "axios";

interface MovieResult {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  media_type: string;
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

interface TmdbApiMovieResponse {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
}

export const getMoviesPosters = async (url: string) => {
  const { data: moviesData } = await axios.get<TmdbApiMovieResponse>(url);
  const moviesPosters = moviesData.results.map((movie) => {
    return movie.backdrop_path;
  });
  return moviesPosters;
};
