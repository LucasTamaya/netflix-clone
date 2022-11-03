import { useLazyQuery } from "../useLazyQuery";
import { handleLogout } from "../../api/auth/logout";

export const useLogout = () => {
  return useLazyQuery(["logout"], handleLogout, {
    // disable automatic query when component mount
    enabled: false,
  });
};
