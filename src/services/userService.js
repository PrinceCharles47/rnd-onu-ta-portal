import { keys } from "@mantine/core";
import { axiosInstanceDev } from "../api/axios";

const USER_URL_PREFIX = "/users";

const userURLs = {
  SIGNED_IN_USER: "own-details/",
  CREATE_USER: "register/",
  USERS_LIST: USER_URL_PREFIX,
  CHANGE_PASSWORD: "change-password/", // /user/{userProfileId}/change-password
  ACCOUNT_ACTIVATION: "activation/", // /user/{userProfileId}/activation
  REMOVE_ACCOUNT: "delete/", // /users/{userProfileId}/delete
};

export const userService = {
  getLoggedInUser: () =>
    axiosInstanceDev
      .get(`${USER_URL_PREFIX}/${userURLs.SIGNED_IN_USER}`)
      .then((res) => res.data),

  getUsers: async ({ page, isActive, searchVal, filters }) => {
    const hasFilters = Boolean(filters && keys(filters).length > 0);
    const filterParams = hasFilters
      ? {
          "profile.companyName": filters.companyName || undefined,
          "profile.department": filters.department || undefined,
          "profile.vendorType": filters.vendorType || undefined,
          "profile.role.name": filters.roleName || undefined,
        }
      : {};

    // Build params dynamically
    const params = {
      isActive,
      page: page || undefined,
      search: searchVal || undefined,
      ...(hasFilters && filterParams),
    };

    return axiosInstanceDev
      .get(`${userURLs.USERS_LIST}/`, { params })
      .then((res) => res.data);
  },

  createUser: (payload) =>
    axiosInstanceDev
      .post(`${USER_URL_PREFIX}/${userURLs.CREATE_USER}`, payload)
      .then((res) => res.data),

  changePassword: ({ userId, payload }) =>
    axiosInstanceDev
      .post(`${USER_URL_PREFIX}/${userId}/${userURLs.CHANGE_PASSWORD}`, payload)
      .then((res) => res.data),

  deactivateAccount: ({ userId }) =>
    axiosInstanceDev
      .patch(`${USER_URL_PREFIX}/${userId}/${userURLs.ACCOUNT_ACTIVATION}`, {
        isActive: false,
      })
      .then((res) => res.data),

  restoreAccount: ({ userId }) =>
    axiosInstanceDev
      .patch(`${USER_URL_PREFIX}/${userId}/${userURLs.ACCOUNT_ACTIVATION}`, {
        isActive: true,
      })
      .then((res) => res.data),

  removeAccount: ({ userId }) =>
    axiosInstanceDev
      .delete(`${USER_URL_PREFIX}/${userId}/${userURLs.REMOVE_ACCOUNT}`)
      .then((res) => res.data),
};
