import { useMutation } from "@tanstack/react-query";

import { handleLogin } from "../../api/auth/login";
import { ApiAuthResponse } from "../../types/index";

export const useLogin = (
  email: string | undefined,
  password: string | undefined
) => {
  return useMutation<ApiAuthResponse, Error>(() =>
    handleLogin(email, password)
  );
};
