import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { NetflixBackground } from "../components/common/NetflixBackground";
import { Nav } from "../components/common/Nav";
import { useAppDispatch } from "../hooks/redux/index";
import { setEmail } from "../redux/slices/userSlice";

export const HomeScreen: React.FC = () => {
  const [emailAddress, setEmailAddress] = useState<string>("");

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(setEmail(emailAddress));
    navigate("/login");
  };

  return (
    <NetflixBackground>
      <Nav />
      <div className="w-full h-screen flex flex-col justify-center items-center gap-y-8 px-10">
        <h1 className="text-white text-center text-4xl sm:text-6xl font-bold">
          Unlimited films, TV programmes and more.
        </h1>
        <h2 className="text-white text-center text-2xl sm:text-3xl">
          Watch anywhere. Cancel at any time.
        </h2>
        <h3 className="text-white text-center text-base sm:text-xl">
          Ready to watch? Enter your email to create or restart your membership.
        </h3>
        <form className="w-full flex flex-col gap-y-3 sm:flex-row sm:gap-0 max-w-2xl">
          <input
            className="flex-1 outline-none rounded sm:rounded-none sm:rounded-tl sm:rounded-bl p-3 sm:p-5"
            type="email"
            placeholder="Email address"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <button
            className="text-white text-xs sm:text-base font-bold uppercase rounded sm:rounded-none sm:rounded-tr sm:rounded-br p-4 sm:p-5 bg-[#E50913] transition hover:bg-red-600"
            type="submit"
            onClick={handleSubmit}
          >
            Get started
          </button>
        </form>
      </div>
    </NetflixBackground>
  );
};
