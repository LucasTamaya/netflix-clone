import axios from "axios";

import { SERVER_BASE_URL } from "../../constants/server";

export const handleUpdateNetflixPlan = async (
  email: string | null,
  netflixPlan: string | null
) => {
  const { data: update } = await axios.patch(
    `${SERVER_BASE_URL}/user/netflix-plan`,
    {
      email,
      netflixPlan,
    }
  );

  if (!update.isSuccess) {
    throw new Error(update.error);
  }
};
