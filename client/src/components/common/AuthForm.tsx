import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginValidationSchema } from "~src/validations/userValidation";

interface Props {
  title: "Login" | "Register";
  mutate: () => any;
  email: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | undefined;
  successUrl: "/browse" | "/select-plans";
}

interface FormValues {
  email: string;
  password: string;
}

export const AuthForm: React.FC<Props> = ({
  title,
  mutate,
  email,
  setEmail,
  password,
  setPassword,
  isLoading,
  isSuccess,
  error,
  successUrl,
}) => {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(loginValidationSchema),
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate(successUrl);
    }
  }, [isSuccess, navigate, successUrl]);

  return (
    <div className="w-full h-screen flex justify-center items-center px-5 sm:px-10">
      <form
        onSubmit={handleSubmit(mutate)}
        className="bg-black/80 rounded w-full max-w-md p-10 sm:p-14"
      >
        <h1 className="text-white text-3xl mb-8">{title}</h1>
        <div className="flex flex-col gap-y-4">
          {error ? <p className="text-red-500">{error}</p> : null}
          <Controller
            control={control}
            name="email"
            render={({
              field: { value = email, onChange },
              fieldState: { error },
            }) => (
              <>
                <input
                  className="text-white outline-none rounded w-full bg-zinc-700 px-5 py-3"
                  type="text"
                  placeholder="Email address"
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                    setEmail(e.target.value);
                  }}
                />
                {error ? (
                  <p className="text-red-500 text-xs">{error.message}</p>
                ) : null}
              </>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({
              field: { value = password, onChange },
              fieldState: { error },
            }) => (
              <>
                <input
                  className="text-white outline-none rounded w-full bg-zinc-700 px-5 py-3"
                  type="password"
                  placeholder="Password"
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                    setPassword(e.target.value);
                  }}
                />
                {error ? (
                  <p className="text-red-500 text-xs">{error.message}</p>
                ) : null}
              </>
            )}
          />
        </div>
        <button
          className="w-full text-white font-semibold h-12 rounded bg-red-netflix mt-10"
          type="submit"
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
            onClick={() => navigate(title === "Login" ? "/register" : "/login")}
          >
            {title === "Login" ? <>Register</> : <>Login</>}
          </button>
        </p>
      </form>
    </div>
  );
};
