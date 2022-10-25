import { moviesRequests } from "../assets/moviesRequests";
import { getRandomMovieData } from "./getRandomMovieData";

let trendingMoviesUrl: string;

export const getBannerMovieData = async () => {
  moviesRequests.every((movie) => {
    if (movie.category === "Trending") {
      trendingMoviesUrl = movie.url;
      return true; // return true and exist the loop
    }
    return false;
  });
  const moviesData = await getRandomMovieData(trendingMoviesUrl);
  return moviesData;
};
