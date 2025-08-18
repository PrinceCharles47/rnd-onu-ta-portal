// services
import { useQuery } from "@tanstack/react-query";
import { testCaseService } from "../../services/testCaseService";

const queryKeys = {
  TEST_CASES: "test_cases",
};

export const useTestCases = ({ wifiType }) => {
  const getTestCases = useQuery({
    queryKey: [queryKeys.TEST_CASES],
    queryFn: () => testCaseService.getTestCases({ wifiType }),
  });

  return {
    testCases: getTestCases.data,
    isLoading: getTestCases.isLoading,
    isError: getTestCases.isError,
  };
};
