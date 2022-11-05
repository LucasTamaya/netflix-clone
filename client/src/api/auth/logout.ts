import axios from "axios";

import { SERVER_BASE_URL } from "../../constants/server";

export const handleLogout = async () => {
  const { data } = await axios.get(`${SERVER_BASE_URL}/logout`);

  return data;
};
