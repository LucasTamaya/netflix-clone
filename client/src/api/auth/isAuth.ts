import axios from "axios";

import { SERVER_BASE_URL } from "./../../constants/server";

export const handleIsAuth = async () => {
  const { data } = await axios.get(`${SERVER_BASE_URL}/browse`, {
    withCredentials: true,
  });

  return data;
};
