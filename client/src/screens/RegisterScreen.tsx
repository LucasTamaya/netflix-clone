import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../hooks/redux/index";
import { NetflixBackground } from "../components/common/NetflixBackground";
import { Nav } from "../components/common/Nav";
import { AuthForm } from "../components/common/AuthForm";
import { useRegister } from "../hooks/auth/useRegister";

export const RegisterScreen: React.FC = () => {
  const emailAddress = useAppSelector((state) => state.user.email);

  const [email, setEmail] = useState<string>(emailAddress || "");
  const [password, setPassword] = useState<string>("");

  const { mutate, isLoading, isSuccess, error } = useRegister(email, password);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("email", email);
      navigate("/select-plans");
    }
  }, [isSuccess, navigate, email]);

  return (
    <NetflixBackground>
      <Nav />
      <AuthForm
        title="Register"
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleAuth={mutate}
        isLoading={isLoading}
        authError={error}
        changeAuthMethodPath="/login"
      />
    </NetflixBackground>
  );
};
