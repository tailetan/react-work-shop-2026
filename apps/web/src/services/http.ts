import { createHttpClient } from "@react-workshop/http-client";

export const API_BASE_URL = "https://dummyjson.com";

/**
 * Single HTTP client for the app. Feature `api/` modules build on top of this
 * so components never talk to Axios directly.
 */
export const httpClient = createHttpClient({
  baseURL: API_BASE_URL,
  timeout: 15_000
});
