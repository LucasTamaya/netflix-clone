import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Banner } from "../components/banner/Banner";
import { Nav } from "../components/common/Nav";
import { UnauthorizedError } from "../components/common/UnauthorizedError";
import { MoviesCatalog } from "../components/movie/MoviesCatalog";
import { AppWrapper } from "../components/ui/AppWrapper";
import { useValidAuth } from "../hooks/auth/useValidAuth";

const BrowseScreen: React.FC = () => {
  const { isError, isSuccess } = useValidAuth();

  const navigate = useNavigate();

  useEffect(() => {
    let redirectUser: NodeJS.Timeout;

    if (isError) {
      // make sure we clear any invalid token
      localStorage.clear();
      redirectUser = setTimeout(() => navigate("/"), 3000);
    }

    return () => clearTimeout(redirectUser);
  }, [isError, navigate]);

  if (isError) {
    return (
      <AppWrapper>
        <UnauthorizedError />
      </AppWrapper>
    );
  }

  return (
    <div
      className="bg-zinc-900 min-h-screen"
      style={{
        backgroundImage:
          "linear-gradient(0deg, transparent, rgba(14,14,14,0.61), #111)",
      }}
    >
      {isSuccess ? (
        <>
          <Nav />
          <Banner />
          <MoviesCatalog />
        </>
      ) : null}
    </div>
  );
};

export default BrowseScreen;
