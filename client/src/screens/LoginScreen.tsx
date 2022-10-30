import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../hooks/redux/index";
import { NetflixBackground } from "../components/common/NetflixBackground";
import { Nav } from "../components/common/Nav";
import { AuthForm } from "../components/common/AuthForm";
import { useLogin } from "../hooks/auth/useLogin";
import { useAuthUser } from "../hooks/auth/useAuthUser";

export const LoginScreen: React.FC = () => {
  const emailAddress = useAppSelector((state) => state.user.email);

  const [email, setEmail] = useState<string>(emailAddress || "");
  const [password, setPassword] = useState<string>("");

  const { mutate, isLoading, isSuccess, error } = useLogin(email, password);

  const authenticateUser = useAuthUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      authenticateUser();
      navigate("/browse");
    }
  }, [isSuccess, authenticateUser, navigate]);

  return (
    <NetflixBackground>
      <Nav />
      <AuthForm
        title="Login"
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleAuth={mutate}
        isLoading={isLoading}
        authError={error}
        changeAuthMethodPath="/register"
      />
    </NetflixBackground>
  );
};
