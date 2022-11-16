import axios from "axios";

import { SERVER_BASE_URL } from "~src/constants/server";
import { ApiAuthResponse } from "~src/types";

export const handleRegister = async (
  email: string | undefined,
  password: string | undefined
) => {
  const { data: auth } = await axios.post<ApiAuthResponse>(
    `${SERVER_BASE_URL}/auth/register`,
    {
      email,
      password,
    }
  );

  if (auth.isError) {
    throw new Error(auth.error);
  }

  localStorage.setItem("token", auth.token);

  return auth;
};
