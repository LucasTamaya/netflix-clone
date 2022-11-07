import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

interface Props {
  title: "Login" | "Register";
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleAuth: () => any;
  isLoading: boolean;
  error: string | undefined;
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
  error,
  changeAuthMethodPath,
}) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    handleAuth();
  };

  return (
    <div className="w-full h-screen flex justify-center items-center px-5 sm:px-10">
      <form className="bg-black/80 rounded w-full max-w-md p-10 sm:p-14">
        <h1 className="text-white text-3xl mb-8">{title}</h1>
        <div className="flex flex-col gap-y-4">
          {error ? <p className="text-red-500">{error}</p> : null}
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
          onClick={handleClick}
        >
          {isLoading ? (
            <ClipLoader
              role="loader"
              color="white"
              size={20}
              speedMultiplier={0.7}
            />
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
          <button
            className="text-white font-semibold cursor-pointer"
            onClick={() => navigate(changeAuthMethodPath)}
          >
            {title === "Login" ? <>Register</> : <>Login</>}
          </button>
        </p>
      </form>
    </div>
  );
};
