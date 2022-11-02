import { useQuery } from "@tanstack/react-query";

import { getUserProfileData } from "../api/getUserProfileData";
import { ApiUserProfileDataResponse } from "../types";

export const useUserProfileData = () => {
  return useQuery<ApiUserProfileDataResponse, any>(
    ["userProfileData"],
    getUserProfileData
  );
};
