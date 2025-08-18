import { axiosInstanceDev } from "../api/axios";

const TEST_CASE_URL_PREFIX = "/test-cases";

const testCaseURLs = {
  TEST_CASES: TEST_CASE_URL_PREFIX,
  ASSIGNED_TEST_CASES: TEST_CASE_URL_PREFIX,
  ASSIGN_TEST_CASES: "/onus/v1/update-test-cases/",
};

export const testCaseService = {
  getTestCases: ({ wifiType }) =>
    axiosInstanceDev
      .get(`${testCaseURLs.TEST_CASES}/`, { wifiType })
      .then((res) => res.data),

  getAssignedTestCases: ({ onuId }) =>
    axiosInstanceDev
      .get(`${testCaseURLs.ASSIGNED_TEST_CASES}/`, { id: onuId })
      .then((res) => res.data),

  assignTestCases: ({ onuId, payload }) =>
    axiosInstanceDev
      .put(`${ASSIGN_TEST_CASES}`, { id: onuId, payload })
      .then((res) => res.data),
};
