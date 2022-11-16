import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getUserProfileData } from "~src/api/user/getUserProfileData";
import { ApiUserProfileDataResponse } from "~src/types";

export const useUserProfileData = () => {
  return useQuery<ApiUserProfileDataResponse, AxiosError>(
    ["userProfileData"],
    getUserProfileData
  );
};
