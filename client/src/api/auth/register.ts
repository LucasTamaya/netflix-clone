import axios from "axios";

import { SERVER_BASE_URL } from "../../constants/server";
import { ServerAuthApiResponse } from "../../types";

export const handleRegister = async (email: string, password: string) => {
  const { data: auth } = await axios.post<ServerAuthApiResponse>(
    `${SERVER_BASE_URL}/register`,
    {
      email,
      password,
    }
  );

  if (!auth.ok) {
    throw new Error(auth.error);
  }
};
