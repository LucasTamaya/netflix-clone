import { useState } from "react";

import { NetflixBackground } from "../components/Common/NetflixBackground";
import { Nav } from "../components/Common/Nav";
import { AuthForm } from "../components/Common/AuthForm";
import { useRegister } from "../hooks/auth/useRegister";

export const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState<string>(
    localStorage.getItem("email") || ""
  );
  const [password, setPassword] = useState<string>("");

  const { mutate, isLoading, isSuccess, error } = useRegister(email, password);

  return (
    <NetflixBackground>
      <Nav />
      <AuthForm
        title="Register"
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        mutate={mutate}
        isLoading={isLoading}
        isSuccess={isSuccess}
        error={error?.message}
        successUrl="/select-plans"
      />
    </NetflixBackground>
  );
};
