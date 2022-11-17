import { useState } from "react";

import { NetflixBackground } from "../components/common/NetflixBackground";
import { Nav } from "../components/common/Nav";
import { AuthForm } from "../components/common/AuthForm";
import { useLogin } from "../hooks/auth/useLogin";
import Helmet from "../components/common/Helmet";

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { mutate, isLoading, isSuccess, error } = useLogin(email, password);

  return (
    <>
      <Helmet
        title="Netflix Clone - Login"
        content="Login to the best Netflix Clone you have never seen! Build with some fresh technologies such as React, TypeScript, Tailwind and much more!"
        path="/login"
      />
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
    </>
  );
};
