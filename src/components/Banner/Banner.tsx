import { useQuery } from "@tanstack/react-query";

import { getSingleMovie } from "../../api/getSingleMovie";
import { TMDB_BASE_IMG_URL } from "../../constants/tmdb";
import { BannerError } from "./BannerError";
import { BannerFilter } from "./BannerFilter";
import { BannerLoading } from "./BannerLoading";

export const Banner: React.FC = () => {
  const { isLoading, isError, isSuccess, data } = useQuery(
    ["movie"],
    getSingleMovie
  );

  return (
    <>
      {isLoading ? <BannerLoading /> : null}

      {isError ? <BannerError /> : null}

      {isSuccess ? (
        <div
          className="relative w-full h-[700px] transition duration-200 bg-cover bg-center object-fit"
          style={{
            backgroundImage: `url(${TMDB_BASE_IMG_URL}${data.backdrop_path})`,
          }}
        >
          <div className="absolute top-1/3 ml-10 z-10">
            <h1 className="text-white text-5xl font-extrabold">
              {data.title || data.name}
            </h1>
            <button className="text-white py-1 px-6 rounded cursor-pointer bg-gray-200/30 mt-5">
              Play
            </button>
            <button className="text-white py-1 px-6 rounded cursor-pointer bg-gray-200/30 ml-2">
              My List
            </button>
            <p className="text-white mt-5">{data.overview}</p>
          </div>
          <BannerFilter />
        </div>
      ) : null}
    </>
  );
};
