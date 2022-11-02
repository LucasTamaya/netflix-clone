import { useQuery } from "@tanstack/react-query";
import { getUserProfileData } from "../api/getUserProfileData";

export const useUserProfileData = () => {
  return useQuery(["userProfileData"], getUserProfileData);
};
