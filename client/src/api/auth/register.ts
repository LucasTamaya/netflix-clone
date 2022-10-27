import axios from "axios";

import { SERVER_BASE_URL } from "../../constants/server";

export const handleRegister = async (email: string, password: string) => {
  const { data } = await axios.post(`${SERVER_BASE_URL}/register`, {
    email,
    password,
  });

  console.log(data);

  return data;
};
