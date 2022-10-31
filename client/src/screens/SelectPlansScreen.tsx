import { useState } from "react";

import { Nav } from "../components/common/Nav";
import { NetflixPlan } from "../components/NetflixPlan";
import {
  checkoutOptions,
  netflixBasicItem,
  netflixPremiumItem,
  netflixStandardItem,
} from "../stripe/assets";
import { redirectToCheckout } from "../stripe/redirectToCheckout";

export const SelectPlansScreen: React.FC = () => {
  const [stripeError, setStripeError] = useState<string | undefined>();
  const [isLoading, setLoading] = useState<boolean>(false);

  return (
    <div className="bg-zinc-900 px-14">
      <Nav />
      <div className="w-full max-w-3xl mx-auto h-screen flex flex-col justify-center">
        <h1 className="text-white text-5xl mb-10">Select a plan</h1>
        <div className="flex flex-col gap-y-5">
          <NetflixPlan
            title="Netflix Basic"
            price={9.99}
            resolution="780p"
            buttonTitle="Subscribe"
            isActive={false}
            handleClick={() =>
              redirectToCheckout({
                ...checkoutOptions,
                lineItems: [netflixBasicItem],
              })
            }
          />
          <NetflixPlan
            title="Netflix Standard"
            price={19.99}
            resolution="1080p"
            buttonTitle="Subscribe"
            isActive={false}
            handleClick={() =>
              redirectToCheckout({
                ...checkoutOptions,
                lineItems: [netflixStandardItem],
              })
            }
          />
          <NetflixPlan
            title="Netflix Premium"
            price={29.99}
            resolution="4K"
            buttonTitle="Subscribe"
            isActive={false}
            handleClick={() =>
              redirectToCheckout({
                ...checkoutOptions,
                lineItems: [netflixPremiumItem],
              })
            }
          />
        </div>
      </div>
    </div>
  );
};
