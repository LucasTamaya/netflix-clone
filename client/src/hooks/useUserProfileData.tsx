import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getUserProfileData } from "../api/getUserProfileData";
import { ApiUserProfileDataResponse } from "../types";

export const useUserProfileData = () => {
  return useQuery<ApiUserProfileDataResponse, AxiosError>(
    ["userProfileData"],
    getUserProfileData
  );
};
