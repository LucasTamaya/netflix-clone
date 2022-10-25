import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { getMoviesPosters } from "../api/getMoviesPosters";
import { TMDB_BASE_IMG_URL } from "../constants/tmdb";

interface Props {
  category: string;
  url: string;
}

export const MovieRow: React.FC<Props> = ({ category, url }) => {
  const { isLoading, isError, isSuccess, data } = useQuery([category], () =>
    getMoviesPosters(url)
  );

  return (
    <div>
      <h2 className="text-white text-2xl font-extrabold mb-3">{category}</h2>

      {isLoading && <p>Loading...</p>}

      {isError && <p>An error happen</p>}

      {isSuccess && (
        <div className="flex flex-row gap-x-3 overflow-x-auto pb-8 scrollbar-hide">
          {data.map((moviePosterUrl) => (
            <LazyLoadImage
              key={uuidv4()}
              src={`${TMDB_BASE_IMG_URL}${moviePosterUrl}`}
              alt="movie poster"
              className="w-72 h-36 object-cover cursor-pointer transition duration-150 hover:scale-105"
            />
          ))}
        </div>
      )}
    </div>
  );
};
