import { MovieRow } from "./MovieRow";

import { moviesRequests } from "../assets/moviesRequests";

export const MoviesCatalog: React.FC = () => {
  return (
    <div className="mt-10 ml-10">
      {moviesRequests.map(({ category, url }) => (
        <MovieRow key={category} category={category} url={url} />
      ))}
    </div>
  );
};
