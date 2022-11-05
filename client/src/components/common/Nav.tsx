import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { NETFLIX_ICON_URL, PROFILE_ICON_URL } from "../../assets/icons";

export const Nav: React.FC = () => {
  const [showNavBackground, setShowNavBackground] = useState<boolean>(false);

  const jwt = localStorage.getItem("token");

  const navigate = useNavigate();

  const navBackgroundTransition = () => {
    if (window.scrollY > 100) {
      setShowNavBackground(true);
    }

    if (window.scrollY < 100) {
      setShowNavBackground(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", navBackgroundTransition);

    return () => window.removeEventListener("scroll", navBackgroundTransition);
  }, []);

  return (
    <nav
      className={`${
        showNavBackground && "bg-zinc-900"
      } fixed top-0 left-0 w-full flex justify-between items-center px-10 py-2 transition duration-300 z-20`}
    >
      <img
        src={NETFLIX_ICON_URL}
        alt="netflix logo"
        className="w-28 sm:w-36 cursor-pointer"
        onClick={() => navigate("/")}
      />
      {jwt ? (
        <img
          src={PROFILE_ICON_URL}
          alt="profile icon"
          className="w-9 h-9 sm:w-12 sm:h-12 cursor-pointer"
          onClick={() => navigate("/profile")}
        />
      ) : null}
    </nav>
  );
};
