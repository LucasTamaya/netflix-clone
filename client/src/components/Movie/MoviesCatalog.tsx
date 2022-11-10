import { moviesRequests } from "../../assets/moviesRequests";
import { MovieRow } from "./MovieRow";

export const MoviesCatalog: React.FC = () => {
  return (
    <div className="mt-[-10px] ml-10">
      {moviesRequests.map(({ category, url }) => (
        <MovieRow key={category} category={category} url={url} />
      ))}
    </div>
  );
};
