import axios from "axios";

import { SERVER_BASE_URL } from "../../constants/server";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const handleValidAuth = async () => {
  const { data } = await axios.get(`${SERVER_BASE_URL}/auth/valid`, config);

  return data;
};
