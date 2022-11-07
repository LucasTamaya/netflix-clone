import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { NetflixBackground } from "../components/common/NetflixBackground";
import { Nav } from "../components/common/Nav";
import { AuthForm } from "../components/common/AuthForm";
import { useLogin } from "../hooks/auth/useLogin";

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>(
    localStorage.getItem("email") || ""
  );
  const [password, setPassword] = useState<string>("");

  const { mutate, isLoading, isSuccess, error } = useLogin(email, password);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/browse");
    }
  }, [isSuccess, navigate]);

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
        error={error?.message}
        changeAuthMethodPath="/register"
      />
    </NetflixBackground>
  );
};
