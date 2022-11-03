import { TMDB_BASE_IMG_URL } from "../../constants/tmdb";
import { useBannerMovieData } from "../../hooks/movie/useBannerMovieData";
import { BannerError } from "./BannerError";
import { BannerFilter } from "./BannerFilter";
import { BannerLoading } from "./BannerLoading";

export const Banner: React.FC = () => {
  const { isLoading, isError, isSuccess, data } = useBannerMovieData();

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
          <div className="absolute top-1/3 mx-10 z-10">
            <h1 className="text-white text-4xl sm:text-6xl font-extrabold max-w-5xl">
              {data.title || data.name}
            </h1>
            <button className="text-white py-1 px-6 rounded cursor-pointer bg-gray-200/30 mt-5">
              Play
            </button>
            <button className="text-white py-1 px-6 rounded cursor-pointer bg-gray-200/30 ml-2">
              My List
            </button>
            <p className="text-white text-base sm:text-lg font-semibold mt-5 max-w-2xl">
              {data.overview}
            </p>
          </div>
          <BannerFilter />
        </div>
      ) : null}
    </>
  );
};
