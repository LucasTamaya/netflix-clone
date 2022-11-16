import { moviesRequests } from "~src/assets/moviesRequests";
import { MovieRow } from "~src/components/Movie/MovieRow";

export const MoviesCatalog: React.FC = () => {
  return (
    <div data-testid="moviesCatalog" className="mt-[-10px] ml-10">
      {moviesRequests.map(({ category, url }) => (
        <MovieRow key={category} category={category} url={url} />
      ))}
    </div>
  );
};
