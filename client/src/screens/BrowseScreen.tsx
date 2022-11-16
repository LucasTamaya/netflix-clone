import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Banner } from "~src/components/Banner/Banner";
import { Nav } from "~src/components/Common/Nav";
import { UnauthorizedError } from "~src/components/Common/UnauthorizedError";
import { MoviesCatalog } from "~src/components/Movie/MoviesCatalog";
import { AppWrapper } from "~src/components/Ui/AppWrapper";
import { useValidAuth } from "~src/hooks/auth/useValidAuth";

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
