import axios from "axios";

import { TmdbApiMovieResponse } from "../../types";

export const getMoviesPosters = async (
  url: string
): Promise<(string | undefined)[]> => {
  const { data: moviesData } = await axios.get<TmdbApiMovieResponse>(url);

  const moviesPosters = moviesData.results.map((movie) => {
    if (movie.backdrop_path) {
      return movie.backdrop_path;
    }
  });

  return moviesPosters;
};
