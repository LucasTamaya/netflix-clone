import { SERVER_BASE_URL } from "../../constants/server";
import { ApiResponse } from "../../types";
import { axiosInstance } from "../axios";

export const handleLogin = async (email: string, password: string) => {
  const { data: auth } = await axiosInstance.post<ApiResponse>(
    `${SERVER_BASE_URL}/login`,
    {
      email,
      password,
    }
  );

  if (!auth.isSuccess) {
    // if user not found
    if (auth.error?.includes("sql: no rows in result set")) {
      throw new Error("Wrong email or password");
    }
    throw new Error(auth.error);
  }
};
