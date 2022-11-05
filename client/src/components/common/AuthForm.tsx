import { UseMutateFunction } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ApiAuthResponse } from "../../types";

interface Props {
  title: "Login" | "Register";
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleAuth: UseMutateFunction<ApiAuthResponse, Error, void, unknown>;
  isLoading: boolean;
  authError: Error | null;
  changeAuthMethodPath: "/login" | "/register";
}

export const AuthForm: React.FC<Props> = ({
  title,
  email,
  setEmail,
  password,
  setPassword,
  handleAuth,
  isLoading,
  authError,
  changeAuthMethodPath,
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex justify-center items-center px-10">
      <form className="bg-black/80 rounded w-full max-w-md p-10 sm:p-14">
        <h1 className="text-white text-3xl mb-8">{title}</h1>
        <div className="flex flex-col gap-y-4">
          {authError ? (
            <p className="text-red-500">{authError.message}</p>
          ) : null}
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
          className="w-full text-white font-semibold h-12 rounded bg-red-netflix mt-10"
          onClick={(e) => {
            e.preventDefault();
            handleAuth();
          }}
        >
          {isLoading ? (
            <ClipLoader color="white" size={20} speedMultiplier={0.7} />
          ) : (
            <>{title}</>
          )}
        </button>
        <p className="text-zinc-500 mt-8">
          {title === "Login" ? (
            <>First visit on Netflix? </>
          ) : (
            <>Already have an account? </>
          )}
          <span
            className="text-white font-semibold cursor-pointer"
            onClick={() => navigate(changeAuthMethodPath)}
          >
            {title === "Login" ? <>Register</> : <>Login</>}
          </span>
        </p>
      </form>
    </div>
  );
};
