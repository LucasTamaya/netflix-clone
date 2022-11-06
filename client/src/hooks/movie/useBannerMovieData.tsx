import { useQuery } from "@tanstack/react-query";

import { getBannerMovieData } from "../../api/movie/getBannerMovieData";

export const useBannerMovieData = () => {
  return useQuery(["bannerMovieData"], getBannerMovieData, {
    refetchOnWindowFocus: false,
  });
};
