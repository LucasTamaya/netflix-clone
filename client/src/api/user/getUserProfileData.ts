import { SERVER_BASE_URL } from "../../constants/server";
import { ApiUserProfileDataResponse } from "../../types";
import { axiosInstance } from "../axios";

export const getUserProfileData = async () => {
  const { data } = await axiosInstance.get<ApiUserProfileDataResponse>(
    `${SERVER_BASE_URL}/user-profile`,
    {
      withCredentials: true,
    }
  );

  return data;
};
