import { keys } from "@mantine/core";
import { axiosInstanceDev } from "../api/axios";

const ONU_URL_PREFIX = "/onus";

const onuURLs = {
  CREATE_ONU: "v1/create-onu/",
  ONU_LIST: "v1/index-onu/",
};

export const onuService = {
  getONUs: async ({ page, isArchived, searchVal, filters }) => {
    const hasFilters = Boolean(filters && keys(filters).length > 0);
    const filterParams = hasFilters
      ? {
          status: filters.status || undefined,
          wifiType: filters.wifiType || undefined,
          ontType: filters.ontType || undefined,
        }
      : {};

    // Build params dynamically
    const params = {
      isArchived,
      page: page || undefined,
      search: searchVal || undefined,
      ...(hasFilters && filterParams),
    };

    return axiosInstanceDev
      .get(`${ONU_URL_PREFIX}/${onuURLs.ONU_LIST}`, { params })
      .then((res) => res.data);
  },

  createONU: (payload) =>
    axiosInstanceDev
      .post(`${ONU_URL_PREFIX}/${onuURLs.CREATE_ONU}`, payload)
      .then((res) => res.data),

  //   changePassword: ({ userId, payload }) =>
  //     axiosInstanceDev
  //       .post(`${USER_URL_PREFIX}/${userId}/${userURLs.CHANGE_PASSWORD}`, payload)
  //       .then((res) => res.data),

  //   deactivateAccount: ({ userId }) =>
  //     axiosInstanceDev
  //       .patch(`${USER_URL_PREFIX}/${userId}/${userURLs.ACCOUNT_ACTIVATION}`, {
  //         isArchived: false,
  //       })
  //       .then((res) => res.data),

  //   restoreAccount: ({ userId }) =>
  //     axiosInstanceDev
  //       .patch(`${USER_URL_PREFIX}/${userId}/${userURLs.ACCOUNT_ACTIVATION}`, {
  //         isArchived: true,
  //       })
  //       .then((res) => res.data),

  //   removeAccount: ({ userId }) =>
  //     axiosInstanceDev
  //       .delete(`${USER_URL_PREFIX}/${userId}/${userURLs.REMOVE_ACCOUNT}`)
  //       .then((res) => res.data),
};
