import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import { PROFILE_ICON_URL } from "../assets/icons";
import { Nav } from "../components/common/Nav";
import { UnauthorizedError } from "../components/common/UnauthorizedError";
import { NetflixPlan } from "../components/NetflixPlan";
import { useUserProfileData } from "../hooks/useUserProfileData";
import {
  netflixBasicItem,
  netflixPremiumItem,
  netflixStandardItem,
} from "../stripe/assets";
import { handleSubscribe } from "../stripe/handleSubscribe";

export const ProfileScreen: React.FC = () => {
  const {
    isLoading,
    isError,
    isSuccess,
    data: user,
    error,
  } = useUserProfileData();

  const navigate = useNavigate();

  useEffect(() => {
    let redirectUser: NodeJS.Timeout;

    if (isError) {
      redirectUser = setTimeout(() => navigate("/"), 5000);
    }

    return () => clearTimeout(redirectUser);
  }, [isError, error, navigate]);

  return (
    <div className="bg-zinc-900 px-14">
      <Nav />
      <div className="w-full max-w-3xl mx-auto h-screen flex justify-center items-center">
        {isLoading ? (
          <ClipLoader color="red" size={50} speedMultiplier={0.7} />
        ) : null}

        {isError ? <UnauthorizedError /> : null}

        {isSuccess ? (
          <div className="flex-1">
            <h1 className="text-white text-5xl mb-7">Edit Profile</h1>
            <div className="flex">
              <img
                src={PROFILE_ICON_URL}
                alt="profile icon"
                className="w-24 h-24 mr-7"
              />
              <div className="w-full flex flex-col gap-y-5">
                <p className="text-white font-semibold p-3 rounded bg-zinc-500">
                  {user.email}
                </p>
                <h2 className="text-white text-xl font-bold">
                  Plans (Current Plan: {user.netflixPlan})
                </h2>
                <NetflixPlan
                  title="Netflix Basic"
                  price={9.99}
                  resolution="780p"
                  buttonTitle={
                    user.netflixPlan === "Basic"
                      ? "Current Package"
                      : "Subscribe"
                  }
                  isActive={user.netflixPlan === "Basic" ? true : false}
                  handleClick={() => {
                    if (user.netflixPlan !== "Basic") {
                      handleSubscribe(netflixBasicItem, "Basic");
                    }
                  }}
                />
                <NetflixPlan
                  title="Netflix Standard"
                  price={19.99}
                  resolution="1080p"
                  buttonTitle={
                    user.netflixPlan === "Standard"
                      ? "Current Package"
                      : "Subscribe"
                  }
                  isActive={user.netflixPlan === "Standard" ? true : false}
                  handleClick={() => {
                    if (user.netflixPlan !== "Standard") {
                      handleSubscribe(netflixStandardItem, "Standard");
                    }
                  }}
                />
                <NetflixPlan
                  title="Netflix Premium"
                  price={29.99}
                  resolution="4K"
                  buttonTitle={
                    user.netflixPlan === "Premium"
                      ? "Current Package"
                      : "Subscribe"
                  }
                  isActive={user.netflixPlan === "Premium" ? true : false}
                  handleClick={() => {
                    if (user.netflixPlan !== "Premium") {
                      handleSubscribe(netflixPremiumItem, "Premium");
                    }
                  }}
                />
                <button className="text-white font-semibold bg-red-netflix p-2 rounded transition hover:bg-red-600">
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
