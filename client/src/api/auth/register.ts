import axios from "axios";

import { SERVER_BASE_URL } from "../../constants/server";
import { ApiResponse } from "../../types";

export const handleRegister = async (email: string, password: string) => {
  const { data: auth } = await axios.post<ApiResponse>(
    `${SERVER_BASE_URL}/register`,
    {
      email,
      password,
    }
  );

  if (!auth.isSuccess) {
    throw new Error(auth.error);
  }
};
