import axios from "axios";

import { SERVER_BASE_URL } from "../../constants/server";
import { ApiAuthResponse } from "../../types";

export const handleUpdateNetflixPlan = async (
  email: string | null,
  netflixPlan: string | null
) => {
  const { data: update } = await axios.post<ApiAuthResponse>(
    `${SERVER_BASE_URL}/netflix-plan`,
    {
      email,
      netflixPlan,
    }
  );

  if (!update.isSuccess) {
    throw new Error(update.error);
  }
};
