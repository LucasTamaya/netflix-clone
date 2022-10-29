import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { useAppSelector } from "../hooks/redux/index";
import { NetflixBackground } from "../components/common/NetflixBackground";
import { Nav } from "../components/common/Nav";
import { handleRegister } from "../api/auth/register";
import { AuthForm } from "../components/common/AuthForm";

export const RegisterScreen: React.FC = () => {
  const emailAddress = useAppSelector((state) => state.user.email);

  const [email, setEmail] = useState<string>(emailAddress || "");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const { mutate, isLoading, error } = useMutation<void, Error>(() =>
    handleRegister(email, password, navigate)
  );

  useEffect(() => {
    if (error) console.log(error.message);
  }, [error]);

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
