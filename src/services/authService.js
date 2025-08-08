import { axiosInstanceDev } from "../api/axios";
import { tokenService } from "./tokenService";

const authURLs = {
  SIGN_IN: "/auth/login/",
  SIGN_OUT: "/auth/logout/",
  REFRESH: "/auth/refresh/",
  TOKEN_BASED_SIGN_IN: "/token/", // for development
};

export const authService = {
  login: ({ username, password }) =>
    axiosInstanceDev
      .post(authURLs.TOKEN_BASED_SIGN_IN, { username, password })
      .then((res) => {
        console.log(res.data.access);

        tokenService.setAccessToken(res.data.access);
        tokenService.setRefreshToken(res.data.refresh);
        return res.data;
      }),

  logout: () =>
    axiosInstanceDev.post(authURLs.SIGN_OUT).then((res) => {
      console.log(res)
      tokenService.clear();
    }),
};
