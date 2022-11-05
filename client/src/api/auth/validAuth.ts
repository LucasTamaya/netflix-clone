import axios from "axios";

import { SERVER_BASE_URL } from "../../constants/server";
import { config } from "../jwtConfig";

export const handleValidAuth = async () => {
  const { data } = await axios.get(`${SERVER_BASE_URL}/auth/valid`, config);

  return data;
};
