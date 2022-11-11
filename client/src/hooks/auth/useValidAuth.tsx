import { useQuery } from "@tanstack/react-query";

import { handleValidAuth } from "../../api/auth/validAuth";

export const useValidAuth = () => {
  return useQuery(["validAuth"], handleValidAuth);
};
