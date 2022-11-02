import { PROFILE_ICON_URL } from "../assets/icons";
import { Nav } from "../components/common/Nav";
import { NetflixPlan } from "../components/NetflixPlan";
import { useUserProfileData } from "../hooks/useUserProfileData";
import {
  checkoutOptions,
  netflixBasicItem,
  netflixPremiumItem,
  netflixStandardItem,
} from "../stripe/assets";
import { redirectToCheckout } from "../stripe/redirectToCheckout";
import { StripeItem } from "../types";

export const ProfileScreen: React.FC = () => {
  const { isLoading, isError, isSuccess, data } = useUserProfileData();

  const cookie = document.cookie;

  console.log(cookie);

  if (isSuccess) {
    console.log(data);
  }

  const handleSubscribe = async (productItem: StripeItem) => {
    const error = await redirectToCheckout({
      ...checkoutOptions,
      lineItems: [productItem],
    });

    if (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-900 px-14">
      <Nav />
      <div className="w-full max-w-3xl mx-auto h-screen flex items-center">
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
                toto@orange.fr
              </p>
              <h2 className="text-white text-xl font-bold">
                Plans (Current Plan: premium)
              </h2>
              <NetflixPlan
                title="Netflix Basic"
                price={9.99}
                resolution="780p"
                buttonTitle="Subscribe"
                isActive={false}
                handleClick={() => handleSubscribe(netflixBasicItem)}
              />
              <NetflixPlan
                title="Netflix Standard"
                price={19.99}
                resolution="1080p"
                buttonTitle="Subscribe"
                isActive={false}
                handleClick={() => handleSubscribe(netflixStandardItem)}
              />
              <NetflixPlan
                title="Netflix Premium"
                price={29.99}
                resolution="4K"
                buttonTitle="Subscribe"
                isActive={false}
                handleClick={() => handleSubscribe(netflixPremiumItem)}
              />
              <button className="text-white font-semibold bg-red-netflix p-2 rounded transition hover:bg-red-600">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
