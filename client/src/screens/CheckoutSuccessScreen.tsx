import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import { Nav } from "../components/common/Nav";
import { useUpdateNetflixPlan } from "../hooks/useUpdateNetflixPlan";
import { UnknownError } from "../components/common/UnknownError";

export const CheckoutSuccessScreen: React.FC = () => {
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("email");
  const netflixPlan = localStorage.getItem("netflixPlan");

  const { mutate, isLoading, isError, isSuccess } = useUpdateNetflixPlan(
    userEmail,
    netflixPlan
  );

  useEffect(() => {
    mutate();
  }, [mutate]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/browse");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="bg-zinc-900 px-14">
      <Nav />
      <div className="w-full max-w-3xl mx-auto h-screen flex flex-col justify-center items-center">
        {isLoading ? (
          <>
            <h1 className="text-white text-5xl font-bold mb-10">
              Checkout Success!
            </h1>
            <ClipLoader
              data-testid="loader"
              color="red"
              size={50}
              speedMultiplier={0.7}
            />
          </>
        ) : null}

        {isError ? <UnknownError /> : null}
      </div>
    </div>
  );
};
