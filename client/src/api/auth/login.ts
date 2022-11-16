import axios from "axios";

import { SERVER_BASE_URL } from "~src/constants/server";
import { ApiAuthResponse } from "~src/types";

export const handleLogin = async (
  email: string | undefined,
  password: string | undefined
) => {
  const { data: auth } = await axios.post<ApiAuthResponse>(
    `${SERVER_BASE_URL}/auth/login`,
    {
      email,
      password,
    }
  );

  if (auth.isError) {
    // if user not found
    if (auth.error.includes("sql: no rows in result set")) {
      throw new Error("Wrong email or password");
    }
    throw new Error(auth.error);
  }

  localStorage.setItem("token", auth.token);

  return auth;
};
