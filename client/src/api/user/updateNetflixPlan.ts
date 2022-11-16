import axios from "axios";

import { SERVER_BASE_URL } from "~src/constants/server";
import { ApiUpdateNetflixPlanResponse } from "~src/types";

export const handleUpdateNetflixPlan = async (
  email: string | null,
  netflixPlan: string | null
) => {
  const { data: update } = await axios.patch<ApiUpdateNetflixPlanResponse>(
    `${SERVER_BASE_URL}/user/netflix-plan`,
    {
      email,
      netflixPlan,
    }
  );

  if (update.isError) {
    throw new Error(update.error);
  }
};
