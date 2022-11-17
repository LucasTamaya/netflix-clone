import { Nav } from "../components/common/Nav";
import { NetflixPlan } from "../components/other/NetflixPlan";
import {
  netflixBasicItem,
  netflixPremiumItem,
  netflixStandardItem,
} from "../stripe/assets";
import { handleSubscribe } from "../stripe/utils";
import Helmet from "../components/common/Helmet";

export const SelectPlansScreen: React.FC = () => {
  return (
    <>
      <Helmet
        title="Netflix Clone - Select plans"
        content="Register to the best Netflix Clone you have never seen! Build with some fresh technologies such as React, TypeScript, Tailwind and much more!"
        path="/select-plans"
      />
      <div className="bg-zinc-900 px-14">
        <Nav />
        <div className="w-full max-w-3xl mx-auto h-screen flex flex-col justify-center">
          <h1 className="text-white text-5xl mb-10">Select a plan</h1>
          <div className="flex flex-col gap-y-5">
            <NetflixPlan
              title="Netflix Basic"
              price={9.99}
              resolution="720p"
              buttonTitle="Subscribe"
              canSubscribeToPlan={true}
              subscribe={() => handleSubscribe(netflixBasicItem, "Basic")}
            />
            <NetflixPlan
              title="Netflix Standard"
              price={19.99}
              resolution="1080p"
              buttonTitle="Subscribe"
              canSubscribeToPlan={true}
              subscribe={() => handleSubscribe(netflixStandardItem, "Standard")}
            />
            <NetflixPlan
              title="Netflix Premium"
              price={29.99}
              resolution="4K"
              buttonTitle="Subscribe"
              canSubscribeToPlan={true}
              subscribe={() => handleSubscribe(netflixPremiumItem, "Premium")}
            />
          </div>
        </div>
      </div>
    </>
  );
};
