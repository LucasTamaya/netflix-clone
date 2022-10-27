import { moviesRequests } from "../../assets/moviesRequests";
import { MovieResult } from "../../types";
import { getRandomMovieData } from "./getRandomMovieData";

let trendingMoviesUrl: string;

export const getBannerMovieData = async (): Promise<MovieResult> => {
  moviesRequests.every((movie) => {
    if (movie.category === "Trending") {
      trendingMoviesUrl = movie.url;
      return true; // return true and exist the loop
    }
    return false;
  });
  const bannerMovieData = await getRandomMovieData(trendingMoviesUrl);
  return bannerMovieData;
};
