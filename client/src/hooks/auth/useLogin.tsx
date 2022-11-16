import { useMutation } from "@tanstack/react-query";

import { handleLogin } from "~src/api/auth/login";
import { ApiAuthResponse } from "~src/types/index";

export const useLogin = (
  email: string | undefined,
  password: string | undefined
) => {
  return useMutation<ApiAuthResponse, Error>(() =>
    handleLogin(email, password)
  );
};
