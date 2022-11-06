import { useQuery } from "@tanstack/react-query";

import { getMoviesPosters } from "../../api/movie/getMoviesPosters";

export const useMoviesPosters = (category: string, url: string) => {
  return useQuery([category], () => getMoviesPosters(url), {
    refetchOnWindowFocus: false,
  });
};
