import { useAppSelector } from "../hooks/redux/index";

import { NetflixBackground } from "../components/common/NetflixBackground";
import { Nav } from "../components/common/Nav";

export const LoginScreen: React.FC = () => {
  const emailAddress = useAppSelector((state) => state.user.email);

  return (
    <NetflixBackground>
      <Nav />
      <div className="bg-white">{emailAddress}</div>;
    </NetflixBackground>
  );
};
