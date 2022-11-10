import { useState } from "react";

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

  return (
    <NetflixBackground>
      <Nav />
      <AuthForm
        title="Login"
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        mutate={mutate}
        isLoading={isLoading}
        isSuccess={isSuccess}
        error={error?.message}
        successUrl="/browse"
      />
    </NetflixBackground>
  );
};
