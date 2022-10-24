import axios from "axios";

import { generateRandomInt } from "../utils/generateRandomNumber";
import { moviesRequests } from "../assets/moviesRequests";

let trendingMoviesUrl: string;

export const getSingleMovie = async () => {
  moviesRequests.forEach((movie, i) => {
    console.log(i);
    if (movie.category === "Trending") {
      trendingMoviesUrl = movie.url;
      return;
    }
  });
  const { data: moviesList } = await axios.get(trendingMoviesUrl);
  const maxNb = moviesList.results.length;
  const movieData = moviesList.results[generateRandomInt(0, maxNb)];
  return movieData;
};
