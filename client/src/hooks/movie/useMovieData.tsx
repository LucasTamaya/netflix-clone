import { useQuery } from "@tanstack/react-query";

import { getMovieData } from "~src/api/movie/getMovieData";

export const useMovieData = (category: string, url: string) => {
  return useQuery([category], () => getMovieData(url), {
    refetchOnWindowFocus: false,
  });
};
