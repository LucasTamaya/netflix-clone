import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { getMoviesPosters } from "../../api/movie/getMoviesPosters";
import { TMDB_BASE_IMG_URL } from "../../constants/tmdb";
import { MovieRowLoading } from "./MovieRowLoading";

interface Props {
  category: string;
  url: string;
}

export const MovieRow: React.FC<Props> = ({ category, url }) => {
  const { isLoading, isError, isSuccess, data } = useQuery([category], () =>
    getMoviesPosters(url)
  );

  return (
    <div className="overflow-x-hidden">
      <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3">
        {category}
      </h2>

      {isLoading ? <MovieRowLoading /> : null}

      {isError ? (
        <p className="text-white text-lg font-semibold">
          Oops, something went wrong on the server...
        </p>
      ) : null}

      {isSuccess ? (
        <div className="flex flex-row gap-x-3 overflow-x-auto pb-16 scrollbar-hide">
          {data.map((moviePosterUrl) => (
            <LazyLoadImage
              key={uuidv4()}
              src={`${TMDB_BASE_IMG_URL}${moviePosterUrl}`}
              alt="movie poster"
              className="w-72 h-36 object-cover cursor-pointer transition duration-150 hover:scale-105"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
