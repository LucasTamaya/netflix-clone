import axios from "axios";

import { generateRandomInt } from "../utils/generateRandomNumber";

export const getRandomMovieData = async (url: string) => {
  const { data: moviesList } = await axios.get(url);
  const maxNb = moviesList.results.length;
  const movieData = moviesList.results[generateRandomInt(0, maxNb)];
  return movieData;
};
