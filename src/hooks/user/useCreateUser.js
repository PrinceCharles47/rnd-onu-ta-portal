import { useMutation, useQueryClient } from "@tanstack/react-query";
import { alertBus } from "../../utils/alertBus";
import { userService } from "../../services/userService";

const queryKeys = {
  ALL_USERS: "all_users",
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  const createUser = useMutation({
    mutationFn: userService.createUser,
    onSuccess: async (data) => {
      alertBus.showAlert(
        {
          title: "A new user has been added!",
          message: data.message,
        },
        { color: "green" }
      );
      queryClient.invalidateQueries([queryKeys.ALL_USERS]);
    },
  });

  return {
    createUser: createUser.mutate,
    isPending: createUser.isPending,
  };
};
