import { useEffect, useState } from "react";

import { MovieResult, TmdbApiMovieResponse } from "~src/types";
import { generateRandomInt } from "~src/utils/generateRandomNumber";
import { TMDB_BASE_IMG_URL } from "~src/constants/tmdb";
import { useBannerMovieData } from "~src/hooks/movie/useBannerMovieData";
import { BannerError } from "~src/components/Banner/BannerError";
import { BannerFilter } from "~src/components/Banner/BannerFilter";
import { BannerLoading } from "~src/components/Banner/BannerLoading";

export const Banner: React.FC = () => {
  const [banner, setBanner] = useState<MovieResult>();

  const { isLoading, isError, isSuccess, data } = useBannerMovieData();

  const getRandomMovieData = (data: TmdbApiMovieResponse) => {
    const maxNb = data.results.length;
    const randomMovieData = data.results[generateRandomInt(0, maxNb)];

    return randomMovieData;
  };

  useEffect(() => {
    if (data) {
      const randomMovieData = getRandomMovieData(data);

      setBanner(randomMovieData);
    }
  }, [data]);

  return (
    <>
      {isLoading ? <BannerLoading /> : null}

      {isError ? <BannerError /> : null}

      {isSuccess ? (
        <div
          role="banner"
          className="relative w-full h-[700px] transition duration-200 bg-cover bg-center object-fit"
          style={{
            backgroundImage: `url(${TMDB_BASE_IMG_URL}${banner?.backdrop_path})`,
          }}
        >
          <div className="absolute top-1/3 mx-10 z-10">
            <h1 className="text-white text-4xl sm:text-6xl font-extrabold max-w-5xl">
              {banner?.title || banner?.name}
            </h1>
            <button className="text-white py-1 px-6 rounded cursor-pointer bg-gray-200/30 mt-5">
              Play
            </button>
            <button className="text-white py-1 px-6 rounded cursor-pointer bg-gray-200/30 ml-2">
              My List
            </button>
            <p className="text-white text-base sm:text-lg font-semibold mt-5 max-w-2xl">
              {banner?.overview}
            </p>
          </div>
          <BannerFilter />
        </div>
      ) : null}
    </>
  );
};
