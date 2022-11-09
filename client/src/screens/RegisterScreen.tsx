import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { NetflixBackground } from "../components/common/NetflixBackground";
import { Nav } from "../components/common/Nav";
import { AuthForm } from "../components/common/AuthForm";
import { useRegister } from "../hooks/auth/useRegister";

export const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState<string>(
    localStorage.getItem("email") || ""
  );
  const [password, setPassword] = useState<string>("");

  const { mutate, isLoading, isSuccess, error } = useRegister(email, password);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
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
        error={error?.message}
        changeAuthMethodPath="/login"
      />
    </NetflixBackground>
  );
};
