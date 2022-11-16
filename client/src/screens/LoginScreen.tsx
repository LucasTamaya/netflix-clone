import { useState } from "react";

import { NetflixBackground } from "~src/components/Common/NetflixBackground";
import { Nav } from "~src/components/Common/Nav";
import { AuthForm } from "~src/components/Common/AuthForm";
import { useLogin } from "~src/hooks/auth/useLogin";

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
