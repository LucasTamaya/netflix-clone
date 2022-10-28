import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useMutation } from "@tanstack/react-query";

import { useAppSelector } from "../hooks/redux/index";
import { NetflixBackground } from "../components/common/NetflixBackground";
import { Nav } from "../components/common/Nav";
import { handleLogin } from "../api/auth/login";
import { handleRegister } from "../api/auth/register";

export const LoginScreen: React.FC = () => {
  const emailAddress = useAppSelector((state) => state.user.email);

  const [email, setEmail] = useState<string>(emailAddress || "");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const {
    mutate: loginMutate,
    isLoading: loginLoading,
    isError: loginError,
    error: loginErrorMessage,
  } = useMutation<void, string>(() => handleLogin(email, password, navigate));

  const {
    mutate: registerMutate,
    isLoading: registerLoading,
    isError: registerError,
    error: registerErrorMessage,
  } = useMutation<void, string>(() =>
    handleRegister(email, password, navigate)
  );

  return (
    <NetflixBackground>
      <Nav />
      <div className="w-full h-screen flex justify-center items-center px-10">
        <form className="bg-black/80 rounded w-full max-w-md p-10 sm:p-14">
          <h1 className="text-white text-3xl mb-8">Login</h1>
          <div className="flex flex-col gap-y-4">
            <input
              className="text-white outline-none rounded w-full bg-zinc-700 px-5 py-3"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="text-white outline-none rounded w-full bg-zinc-700 px-5 py-3"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full text-white font-semibold h-12 rounded bg-[#E50913] mt-10"
            onClick={(e) => {
              e.preventDefault();
              loginMutate();
            }}
          >
            {loginLoading || registerLoading ? (
              <ClipLoader color="white" size={20} speedMultiplier={0.7} />
            ) : (
              <>Login</>
            )}
          </button>
          <p className="text-zinc-500 mt-8">
            First visit on Netflix?{" "}
            <span
              className="text-white font-semibold cursor-pointer"
              onClick={() => registerMutate()}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </NetflixBackground>
  );
};
