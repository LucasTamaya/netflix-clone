const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const movieRequestUrls = {
  trending: `${TMDB_BASE_URL}/trending/all/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
  netflixOriginals: `${TMDB_BASE_URL}/discover/tv??api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_networks=213`,
  topRated: `${TMDB_BASE_URL}/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
  action: `${TMDB_BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=28`,
  comedy: `${TMDB_BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=35`,
  horror: `${TMDB_BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=27`,
  romance: `${TMDB_BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=10749`,
  documentary: `${TMDB_BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=99`,
};
