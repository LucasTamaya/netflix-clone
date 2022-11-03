import { TmdbApiMovieResponse } from "../../types";
import { axiosInstance } from "../axios";

export const getMoviesPosters = async (url: string): Promise<string[]> => {
  const { data: moviesData } = await axiosInstance.get<TmdbApiMovieResponse>(
    url
  );
  const moviesPosters = moviesData.results.map((movie) => {
    return movie.backdrop_path;
  });
  return moviesPosters;
};
