import { useMutation, useQueryClient } from "@tanstack/react-query";
import { testCaseService } from "../../services/testCaseService";
import { alertBus } from "../../utils/alertBus";

const queryKeys = {
  ASSIGNED_TEST_CASES: "assigned_test_cases",
};

export const useONUActions = () => {
  const queryClient = useQueryClient();

  const assignTestCases = useMutation({
    mutationFn: testCaseService.assignTestCases,
    onSuccess: async (data) => {
      alertBus.showAlert(
        {
          title: "Test cases were updated!",
          message: data.message,
        },
        { color: "green" }
      );
      queryClient.invalidateQueries([
        `${queryKeys.ASSIGNED_TEST_CASES}_${data.id}`,
      ]);
    },
  });

  return {
    assignTestCases: assignTestCases.mutate,
    isAssignTestCasesPending: assignTestCases.isPending,
  };
};
