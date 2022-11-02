import axios from "axios";

import { SERVER_BASE_URL } from "./../constants/server";

export const getUserProfileData = async () => {
  const { data } = await axios.get(`${SERVER_BASE_URL}/user-profile`);

  console.log(data);
};
