import { useMutation } from "@tanstack/react-query";

import { handleUpdateNetflixPlan } from "../api/updateNetflixPlan";

export const useUpdateNetflixPlan = (
  email: string | null,
  netflixPlan: string | null
) => {
  return useMutation<void, Error>(() =>
    handleUpdateNetflixPlan(email, netflixPlan)
  );
};