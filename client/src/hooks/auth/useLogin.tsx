import { useMutation } from "@tanstack/react-query";

import { handleLogin } from "../../api/auth/login";
import { ApiAuthResponse } from "../../types/index";

export const useLogin = (email: string, password: string) => {
  return useMutation<ApiAuthResponse, Error>(() =>
    handleLogin(email, password)
  );
};
