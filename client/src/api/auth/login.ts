import axios from "axios";
import { NavigateFunction } from "react-router-dom";

import { SERVER_BASE_URL } from "../../constants/server";
import { ServerAuthApiResponse } from "../../types";

export const handleLogin = async (
  email: string,
  password: string,
  navigate: NavigateFunction
) => {
  const { data: auth } = await axios.post<ServerAuthApiResponse>(
    `${SERVER_BASE_URL}/login`,
    {
      email,
      password,
    }
  );

  if (!auth.ok) {
    // if user not found
    if (auth.error?.includes("sql: no rows in result set")) {
      throw new Error("Wrong email or password");
    }
    throw new Error(auth.error);
  }

  navigate("/browse");
};
