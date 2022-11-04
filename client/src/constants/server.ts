const DEV_URL = "http://localhost:8080";
const PROD_URL = "https://netflix-clone-api-production.up.railway.app";

export const SERVER_BASE_URL =
  process.env.NODE_ENV === "development" ? DEV_URL : PROD_URL;
