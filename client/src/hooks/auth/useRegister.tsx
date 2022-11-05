import { useMutation } from "@tanstack/react-query";

import { handleRegister } from "../../api/auth/register";
import { ApiAuthResponse } from "../../types/index";

export const useRegister = (email: string, password: string) => {
  return useMutation<ApiAuthResponse, Error>(() =>
    handleRegister(email, password)
  );
};
