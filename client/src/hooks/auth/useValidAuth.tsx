import { useQuery } from "@tanstack/react-query";

import { handleValidAuth } from "~src/api/auth/validAuth";

export const useValidAuth = () => {
  return useQuery(["validAuth"], handleValidAuth);
};
