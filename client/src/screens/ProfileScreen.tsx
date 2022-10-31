import { PROFILE_ICON_URL } from "../assets/icons";
import { Nav } from "../components/common/Nav";
import { NetflixPlan } from "../components/NetflixPlan";
import { useAppSelector } from "../hooks/redux/index";

export const ProfileScreen: React.FC = () => {
  const emailAddress = useAppSelector((state) => state.user.email);

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
                {emailAddress || "null"}
              </p>
              <h2 className="text-white text-xl font-bold">
                Plans (Current Plan: premium)
              </h2>
              <p className="text-white">Renewal date: 10/05/2024</p>
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
                buttonTitle="Current Package"
                isActive={true}
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
