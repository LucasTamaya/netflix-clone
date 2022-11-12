import axios from "axios";

import { TmdbApiMovieResponse } from "~src/types";

export const getMovieData = async (
  url: string
): Promise<TmdbApiMovieResponse> => {
  const { data } = await axios.get<TmdbApiMovieResponse>(url);

  return data;
};
