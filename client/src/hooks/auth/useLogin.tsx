import { useMutation } from "@tanstack/react-query";

import { handleLogin } from "../../api/auth/login";

export const useLogin = (email: string, password: string) => {
  return useMutation<void, Error>(() => handleLogin(email, password));
};
