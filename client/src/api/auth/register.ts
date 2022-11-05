import axios from "axios";

import { SERVER_BASE_URL } from "../../constants/server";
import { ApiAuthResponse } from "../../types";

export const handleRegister = async (email: string, password: string) => {
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
