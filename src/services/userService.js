import { axiosInstanceDev } from "../api/axios";

const userURLs = {
  SIGNED_IN_USER: "/user/own-details/",
};

export const userService = {
  getLoggedInUser: () =>
    axiosInstanceDev.get(userURLs.SIGNED_IN_USER).then((res) => {
      console.log(res.data);
      return res.data;
    }),
};
