import axios from "axios";

import { generateRandomInt } from "../utils/generateRandomNumber";
import { movieRequestUrls } from "./tmdbRequests";

export const getSingleMovie = async () => {
  const { data: moviesList } = await axios.get(movieRequestUrls.trending);
  const maxNb = moviesList.results.length;
  const movieData = moviesList.results[generateRandomInt(0, maxNb)];
  return movieData;
};
