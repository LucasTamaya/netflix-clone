import { useState } from "react";

import { NetflixBackground } from "../components/common/NetflixBackground";
import { Nav } from "../components/common/Nav";
import { AuthForm } from "../components/common/AuthForm";
import { useRegister } from "../hooks/auth/useRegister";
import Helmet from "../components/common/Helmet";

export const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState<string>(
    localStorage.getItem("email") || ""
  );
  const [password, setPassword] = useState<string>("");

  const { mutate, isLoading, isSuccess, error } = useRegister(email, password);

  return (
    <>
      <Helmet
        title="Netflix Clone - Register"
        content="Register to the best Netflix Clone you have never seen! Build with some fresh technologies such as React, TypeScript, Tailwind and much more!"
        path="/register"
      />
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
    </>
  );
};
