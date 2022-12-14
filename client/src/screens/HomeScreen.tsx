import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { NetflixBackground } from "../components/common/NetflixBackground";
import { Nav } from "../components/common/Nav";
import Helmet from "../components/common/Helmet";

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  // if user already auth
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/browse");
    }
  }, [navigate]);

  return (
    <>
      <Helmet
        title="Netflix Clone"
        content="Welcome to the best Netflix Clone you have never seen! Build with some fresh technologies such as React, TypeScript, Tailwind and much more!"
        path="/"
      />
      <NetflixBackground>
        <Nav />
        <div className="w-full h-screen flex flex-col justify-center items-center gap-y-4 px-5 sm:gap-y-8 sm:px-10">
          <h1 className="text-white text-center text-3xl sm:text-6xl font-bold">
            Unlimited films, TV programmes and more.
          </h1>
          <h2 className="text-white text-center text-2xl sm:text-3xl">
            Watch anywhere. Cancel at any time.
          </h2>
          <h3 className="text-white text-center text-base sm:text-xl">
            Ready to watch? Enter your email to create or restart your
            membership.
          </h3>
          <button
            className="w-full max-w-2xl text-white text-xs sm:text-base font-bold uppercase rounded sm:rounded-none sm:rounded-tr sm:rounded-br p-4 sm:p-5 bg-red-netflix transition hover:bg-red-600"
            type="submit"
            onClick={() => navigate("/login")}
          >
            Get started
          </button>
        </div>
      </NetflixBackground>
    </>
  );
};
