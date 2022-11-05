import axios from "axios";

import { SERVER_BASE_URL } from "../../constants/server";
import { ApiUserProfileDataResponse } from "../../types";
import { config } from "../jwtConfig";

export const getUserProfileData = async () => {
  const { data } = await axios.get<ApiUserProfileDataResponse>(
    `${SERVER_BASE_URL}/user/profile`,
    config
  );

  return data;
};
