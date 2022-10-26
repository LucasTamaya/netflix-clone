import { Banner } from "../components/Banner/Banner";
import { Nav } from "../components/common/Nav";
import { MoviesCatalog } from "../components/MoviesCatalog";

export const HomeScreen: React.FC = () => {
  return (
    <div
      className="bg-zinc-900 min-h-screen"
      style={{
        backgroundImage:
          "linear-gradient(0deg, transparent, rgba(14,14,14,0.61), #111)",
      }}
    >
      <Nav />
      <Banner />
      <MoviesCatalog />
    </div>
  );
};
