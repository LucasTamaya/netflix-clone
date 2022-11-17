import axios from "axios";

import { SERVER_BASE_URL } from "../../constants/server";

export const handleValidAuth = async () => {
  const { data } = await axios.get(`${SERVER_BASE_URL}/auth/valid`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data;
};
