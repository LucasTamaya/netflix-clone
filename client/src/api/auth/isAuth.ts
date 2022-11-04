import { SERVER_BASE_URL } from "./../../constants/server";
import { axiosInstance } from "../axios";

export const handleIsAuth = async () => {
  const { data } = await axiosInstance.get(`${SERVER_BASE_URL}/browse`);

  return data;
};
