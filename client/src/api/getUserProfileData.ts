import axios from "axios";

import { SERVER_BASE_URL } from "./../constants/server";

interface ApiUserProfileDataResponse {
  email: string;
  netflixPlan: string;
}

export const getUserProfileData = async () => {
  const { data } = await axios.get<ApiUserProfileDataResponse>(
    `${SERVER_BASE_URL}/user-profile`,
    {
      withCredentials: true,
    }
  );

  return data;
};
