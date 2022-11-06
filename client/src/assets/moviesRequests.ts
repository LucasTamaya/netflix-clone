const TMDB_BASE_URL = "https://api.themoviedb.org/3";

interface IMoviesRequests {
  category: string;
  url: string;
}

export const moviesRequests: IMoviesRequests[] = [
  {
    category: "Trending",
    url: `${TMDB_BASE_URL}/trending/all/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
  },
  {
    category: "Netflix Originals",
    url: `${TMDB_BASE_URL}/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_networks=213`,
  },
  {
    category: "Top Rated",
    url: `${TMDB_BASE_URL}/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
  },
  {
    category: "Action",
    url: `${TMDB_BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=28`,
  },
  {
    category: "Comedy",
    url: `${TMDB_BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=35`,
  },
  {
    category: "Horror",
    url: `${TMDB_BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=27`,
  },
  {
    category: "Romance",
    url: `${TMDB_BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=10749`,
  },
  {
    category: "Mystery",
    url: `${TMDB_BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=9648`,
  },
];
