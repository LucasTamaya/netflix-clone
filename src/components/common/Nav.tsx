import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NETFLIX_LOGO_URL =
  "https://imgs.search.brave.com/d-5QHv0OKNqEzCa8jz0i5B7D_tka_hq1VpvjawK5yzI/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9wbmdp/bWcuY29tL3VwbG9h/ZHMvbmV0ZmxpeC9u/ZXRmbGl4X1BORzI1/LnBuZw";

const PROFILE_ICON_URL =
  "https://imgs.search.brave.com/fQ8kDEDOLsGnkm1jr6s_4gbghG8ATJkTp-VXbWAhdgc/rs:fit:320:320:1/g:ce/aHR0cHM6Ly9taXIt/czMtY2RuLWNmLmJl/aGFuY2UubmV0L3By/b2plY3RfbW9kdWxl/cy9kaXNwLzg0YzIw/MDMzODUwNDk4LjU2/YmE2OWFjMjkwZWEu/cG5n";

export const Nav: React.FC = () => {
  const [showNavBackground, setShowNavBackground] = useState<boolean>(false);

  const navigate = useNavigate();

  const navBackgroundTransition = () => {
    if (window.scrollY > 600) {
      setShowNavBackground(true);
    }

    if (window.scrollY < 600) {
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
        src={NETFLIX_LOGO_URL}
        alt="netflix logo"
        className="w-36 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <img
        src={PROFILE_ICON_URL}
        alt="profile icon"
        className="w-12 h-12 cursor-pointer"
        onClick={() => navigate("/profile")}
      />
    </nav>
  );
};
