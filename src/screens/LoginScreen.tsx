import { SigninBackground } from "../components/common/SigninBackground";
import { Nav } from "../components/common/Nav";

export const LoginScreen: React.FC = () => {
  return (
    <SigninBackground>
      <Nav />
      <div className="bg-white">SignIn Form Part</div>;
    </SigninBackground>
  );
};
