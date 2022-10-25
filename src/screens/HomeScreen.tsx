import { Banner } from "../components/Banner/Banner";
import { Nav } from "../components/common/Nav";
import { MoviesCatalog } from "../components/MoviesCatalog";

export const HomeScreen: React.FC = () => {
  return (
    <div className="bg-zinc-900 min-h-screen">
      <Nav />
      <Banner />
      <MoviesCatalog />
    </div>
  );
};
