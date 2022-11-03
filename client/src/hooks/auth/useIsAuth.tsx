import { useQuery } from "@tanstack/react-query";

import { handleIsAuth } from "../../api/auth/isAuth";

export const useIsAuth = () => {
  return useQuery(["isAuth"], handleIsAuth, { retry: false });
};
