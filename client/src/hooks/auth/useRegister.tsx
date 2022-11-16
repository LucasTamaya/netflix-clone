import { useMutation } from "@tanstack/react-query";

import { handleRegister } from "~src/api/auth/register";
import { ApiAuthResponse } from "~src/types/index";

export const useRegister = (
  email: string | undefined,
  password: string | undefined
) => {
  console.log(email, password);

  return useMutation<ApiAuthResponse, Error>(() =>
    handleRegister(email, password)
  );
};
