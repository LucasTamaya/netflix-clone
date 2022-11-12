import { v4 as uuidv4 } from "uuid";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { TMDB_BASE_IMG_URL } from "~src/constants/tmdb";
import { MovieRowLoading } from "./MovieRowLoading";
import { useMovieData } from "~src/hooks/movie/useMovieData";
import { useEffect, useState } from "react";
import { TmdbApiMovieResponse } from "~src/types";

interface Props {
  category: string;
  url: string;
}

export const MovieRow: React.FC<Props> = ({ category, url }) => {
  const [moviePosters, setMoviePosters] = useState<(string | undefined)[]>();

  const { isLoading, isError, isSuccess, data } = useMovieData(category, url);

  const filterByPosters = (data: TmdbApiMovieResponse) => {
    const posters = data.results.map((movie) => {
      if (movie.backdrop_path) return movie.backdrop_path;
    });

    return posters;
  };

  useEffect(() => {
    if (data) {
      const posters = filterByPosters(data);
      setMoviePosters(posters);
    }
  }, [data]);

  return (
    <div className="overflow-x-hidden">
      <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3">
        {category}
      </h2>

      {isLoading ? <MovieRowLoading /> : null}

      {isError ? (
        <h3 className="text-white text-lg font-semibold">
          Oops, something went wrong on the server...
        </h3>
      ) : null}

      {isSuccess ? (
        <div className="flex flex-row gap-x-3 overflow-x-auto pb-16 scrollbar-hide">
          {moviePosters?.map((posterUrl) => (
            <LazyLoadImage
              key={uuidv4()}
              src={`${TMDB_BASE_IMG_URL}${posterUrl}`}
              alt="movie poster"
              className="w-72 h-36 object-cover cursor-pointer transition duration-150 hover:scale-105"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
