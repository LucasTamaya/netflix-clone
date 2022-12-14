import axios from "axios";

import { SERVER_BASE_URL } from "../../constants/server";
import { ApiUserProfileDataResponse } from "../../types";

export const getUserProfileData = async () => {
  const { data } = await axios.get<ApiUserProfileDataResponse>(
    `${SERVER_BASE_URL}/user/profile`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return data;
};
