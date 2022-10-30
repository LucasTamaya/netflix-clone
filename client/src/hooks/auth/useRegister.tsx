import { useMutation } from "@tanstack/react-query";

import { handleRegister } from "../../api/auth/register";

export const useRegister = (email: string, password: string) => {
  return useMutation<void, Error>(() => handleRegister(email, password));
};
