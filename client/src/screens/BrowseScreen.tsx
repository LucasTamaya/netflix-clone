import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Banner } from "../components/Banner/Banner";
import { Nav } from "../components/common/Nav";
import { UnauthorizedError } from "../components/common/UnauthorizedError";
import { MoviesCatalog } from "../components/MoviesCatalog";
import { AppWrapper } from "../components/ui/AppWrapper";
import { useIsAuth } from "../hooks/auth/useIsAuth";

export const BrowseScreen: React.FC = () => {
  const { isLoading, isError, isSuccess } = useIsAuth();

  const navigate = useNavigate();

  useEffect(() => {
    let redirectUser: NodeJS.Timeout;

    if (isError) {
      redirectUser = setTimeout(() => navigate("/"), 5000);
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
