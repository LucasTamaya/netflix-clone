import axios from "axios";

import { MovieResult, TmdbApiMovieResponse } from "../../types";
import { generateRandomInt } from "../../utils/generateRandomNumber";

export const getRandomMovieData = async (url: string): Promise<MovieResult> => {
  const { data: moviesList } = await axios.get<TmdbApiMovieResponse>(url);
  const maxNb = moviesList.results.length;
  const movieData = moviesList.results[generateRandomInt(0, maxNb)];
  return movieData;
};
