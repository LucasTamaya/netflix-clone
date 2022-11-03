import { SERVER_BASE_URL } from "../../constants/server";
import { ApiResponse } from "../../types";
import { axiosInstance } from "../axios";

export const handleRegister = async (email: string, password: string) => {
  const { data: auth } = await axiosInstance.post<ApiResponse>(
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
