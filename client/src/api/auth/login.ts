import axios from "axios";

import { SERVER_BASE_URL } from "../../constants/server";
import { ApiResponse } from "../../types";

export const handleLogin = async (email: string, password: string) => {
  const { data: auth } = await axios.post<ApiResponse>(
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

  if (auth.isSuccess) {
    localStorage.setItem("token", auth.token);
  }
};
