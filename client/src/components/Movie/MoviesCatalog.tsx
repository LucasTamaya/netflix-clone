import { moviesRequests } from "../../assets/moviesRequests";
import { MovieRow } from "./MovieRow";

export const MoviesCatalog: React.FC = () => {
  return (
    <div data-testid="moviesCatalog" className="mt-1 ml-10">
      {moviesRequests.map(({ category, url }) => (
        <MovieRow key={category} category={category} url={url} />
      ))}
    </div>
  );
};
