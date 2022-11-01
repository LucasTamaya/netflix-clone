import { useNavigate } from "react-router-dom";
import { Nav } from "../components/common/Nav";
import { useUpdateNetflixPlan } from "../hooks/useUpdateNetflixPlan";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

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
    navigate("/browse");
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
            <ClipLoader color="red" size={50} speedMultiplier={0.7} />
          </>
        ) : null}

        {isError ? (
          <>
            <h1 className="text-white text-5xl text-center font-bold mb-10">
              Oops, something went wrong...
            </h1>
            <h2 className="text-white text-2xl">Try to reload the page</h2>
          </>
        ) : null}
      </div>
    </div>
  );
};
