// services
import { useQuery } from "@tanstack/react-query";
import { testCaseService } from "../../services/testCaseService";

const queryKeys = {
  ASSIGNED_TEST_CASES: "assigned_test_cases",
};

export const useAssignedTestCases = ({ onuId }) => {
  const getAssignedTestCases = useQuery({
    queryKey: [`${queryKeys.ASSIGNED_TEST_CASES}_${onuId}`],
    queryFn: () => testCaseService.getAssignedTestCases({ onuId }),
  });

  return {
    assignedTestCases: getAssignedTestCases.data,
    isLoading: getAssignedTestCases.isLoading,
    isError: getAssignedTestCases.isError,
  };
};
