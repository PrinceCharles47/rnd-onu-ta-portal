import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.98.242:8000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// response interceptor to handle access token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log("Error response: ", originalRequest.url);

    // if the request fails due to 401 and it hasn't been retried yet
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh/")
    ) {
      originalRequest._retry = true;

      console.log(originalRequest);

      try {
        await axiosInstance.post("/auth/refresh/"); // call refresh endpoint

        // retry the original request after refresh
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired. Logging out.");
        // window.location.href = "/sign-in";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { axiosInstance };
