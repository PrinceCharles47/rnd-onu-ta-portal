import axios from "axios";
import { tokenService } from "../services/tokenService";

const API_BASE_URL = "http://192.168.0.62:8000/api";
const REFRESH_URL = "/auth/refresh-bearer-token/";

// axiosInstanceDev -> for token-based auth. use this only on development.
const axiosInstanceDev = axios.create({
  baseURL: API_BASE_URL,
});

// axios instance for refreshing access token. this removes the Authorization header.
const axiosInstancePrivate = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstanceDev.interceptors.request.use((config) => {
  const token = tokenService.getAccessToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axiosInstanceDev.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes(REFRESH_URL)
    ) {
      originalRequest._retry = true;
      try {
        // if request fails with status 401 (unauthorized), refresh the access token using the axiosIntancePrivate.
        const res = await axiosInstancePrivate.post(REFRESH_URL, {
          refreshToken: tokenService.getRefreshToken(),
        });

        tokenService.setAccessToken(res.data.accessToken);
        return axiosInstanceDev(originalRequest); // retry the failed request.
      } catch (refreshError) {
        tokenService.clear(); // if refresh token is also expired, clear the tokens and redirect the user to login in page.
        window.location.href = "/sign-in";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { axiosInstanceDev };
