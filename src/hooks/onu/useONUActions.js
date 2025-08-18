import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onuService } from "../../services/onuService";
import { alertBus } from "../../utils/alertBus";

const queryKeys = {
  ALL_ONU: "all_onu",
};

export const useONUActions = () => {
  const queryClient = useQueryClient();

  const createONU = useMutation({
    mutationFn: onuService.createONU,
    onSuccess: async (data) => {
      alertBus.showAlert(
        {
          title: "A new ONU has been added!",
          message: data.message,
        },
        { color: "green" }
      );
      queryClient.invalidateQueries([queryKeys.ALL_ONU]);
    },
  });

  return {
    createONU: createONU.mutate,
    isCreateONUPending: createONU.isPending,
  };
};
