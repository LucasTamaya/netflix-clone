import { Nav } from "../components/common/Nav";
import { NetflixPlan } from "../components/NetflixPlan";

export const SelectPlansScreen: React.FC = () => {
  return (
    <div className="bg-zinc-900 px-14">
      <Nav />
      <div className="w-full max-w-3xl mx-auto h-screen flex flex-col justify-center">
        <h1 className="text-white text-5xl mb-10">Select a plan</h1>
        <div className="flex flex-col gap-y-5">
          <NetflixPlan
            title="Netflix Basic"
            price={9.99}
            resolution="480p"
            buttonTitle="Subscribe"
            isActive={false}
          />
          <NetflixPlan
            title="Netflix Standard"
            price={19.99}
            resolution="1080p"
            buttonTitle="Subscribe"
            isActive={false}
          />
          <NetflixPlan
            title="Netflix Premium"
            price={29.99}
            resolution="4K"
            buttonTitle="Subscribe"
            isActive={false}
          />
        </div>
      </div>
    </div>
  );
};
