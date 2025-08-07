import { axiosInstance } from "../../api/axios";

export const useAuth = () => {
  const authURLs = {
    SIGN_IN: "/auth/login/",
    SIGN_OUT: "/auth/logout/",
    REFRESH: "/auth/refresh/",
  };

  // fetches the current user.
  const fetchUser = async () => {
    const user = await axiosInstance.get();
    return user.data;
  };

  // use this function whenever the access token expires to continue using the api.
  const refreshAccessToken = async () => {
    await axiosInstance.post(authURLs.REFRESH);
  };

  const login = async ({ username, password }) => {
    const response = await axiosInstance.post(authURLs.SIGN_IN, {
      username,
      password,
    });

    return response.data;
  };

  const logout = async () => {
    const response = await axiosInstance.post(authURLs.SIGN_OUT);
    console.log(response);
    
  };

  return { login, logout, fetchUser, refreshAccessToken };
};
