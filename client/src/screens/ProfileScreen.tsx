import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import { PROFILE_ICON_URL } from "../assets/icons";
import { AppWrapper } from "../components/ui/AppWrapper";
import { UnauthorizedError } from "../components/common/UnauthorizedError";
import { UnknownError } from "../components/common/UnknownError";
import { NetflixPlan } from "../components/other/NetflixPlan";
import { useUserProfileData } from "../hooks/useUserProfileData";
import {
  netflixBasicItem,
  netflixPremiumItem,
  netflixStandardItem,
} from "../stripe/assets";
import { handleSubscribe } from "../stripe/utils";
import { LogoutModal } from "../components/other/LogoutModal";
import Helmet from "../components/common/Helmet";

const ProfileScreen: React.FC = () => {
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  const {
    isLoading,
    isError,
    isSuccess,
    error,
    data: user,
  } = useUserProfileData();

  const navigate = useNavigate();

  useEffect(() => {
    let redirectUser: NodeJS.Timeout;

    if (isError && error.response?.status === 401) {
      redirectUser = setTimeout(() => navigate("/"), 5000);
    }

    return () => clearTimeout(redirectUser);
  }, [isError, error, navigate]);

  return (
    <>
      <Helmet
        title="Netflix Clone - User profile"
        content="Welcome to the best Netflix Clone you have never seen! Build with some fresh technologies such as React, TypeScript, Tailwind and much more!"
        path="/profile"
      />
      <AppWrapper>
        {isLoading ? (
          <ClipLoader color="red" size={50} speedMultiplier={0.7} />
        ) : null}

        {isError && error.response?.status === 401 ? (
          <UnauthorizedError />
        ) : null}

        {isError && error.response?.status !== 401 ? <UnknownError /> : null}

        {isSuccess ? (
          <div className="flex-1">
            <h1 className="text-white text-3xl sm:text-5xl mb-7">
              Edit Profile
            </h1>
            <div className="flex">
              <img
                src={PROFILE_ICON_URL}
                alt="profile icon"
                className="hidden sm:block w-24 h-24 mr-7"
              />
              <div className="w-full flex flex-col gap-y-5">
                <p className="text-white font-semibold p-3 rounded bg-zinc-500">
                  {user.email}
                </p>
                <h2 className="text-white text-lg sm:text-xl font-bold">
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
                  canSubscribeToPlan={
                    user.netflixPlan === "Basic" ? false : true
                  }
                  subscribe={() => {
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
                  canSubscribeToPlan={
                    user.netflixPlan === "Standard" ? false : true
                  }
                  subscribe={() => {
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
                  canSubscribeToPlan={
                    user.netflixPlan === "Premium" ? false : true
                  }
                  subscribe={() => {
                    if (user.netflixPlan !== "Premium") {
                      handleSubscribe(netflixPremiumItem, "Premium");
                    }
                  }}
                />
                <button
                  className="flex justify-center items-center h-11 text-white font-semibold bg-red-netflix  rounded transition hover:bg-red-600"
                  onClick={() => setShowLogoutModal(true)}
                >
                  Logout
                </button>
                {showLogoutModal ? (
                  <LogoutModal handleCancel={setShowLogoutModal} />
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </AppWrapper>
    </>
  );
};

export default ProfileScreen;
