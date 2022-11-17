import axios from "axios";

import { TmdbApiMovieResponse } from "../../types";
import { moviesRequests } from "../../assets/moviesRequests";

const trendingMoviesUrl = moviesRequests[0].url;

export const getBannerMovieData = async (): Promise<TmdbApiMovieResponse> => {
  const { data } = await axios.get<TmdbApiMovieResponse>(trendingMoviesUrl);

  return data;
};
