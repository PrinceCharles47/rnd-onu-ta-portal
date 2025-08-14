import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../../services/userService";
import { alertBus } from "../../utils/alertBus";

const queryKeys = {
  ALL_USERS: "all_users",
};

export const useUserActions = () => {
  const queryClient = useQueryClient();

  const changePassword = useMutation({
    mutationFn: ({ userId, payload }) =>
      userService.changePassword({ userId, payload }),
    onSuccess: async (data) => {
      alertBus.showAlert(
        {
          title: "A user's password has been updated.",
          message: data.message,
        },
        { color: "green" }
      );
      queryClient.invalidateQueries([queryKeys.ALL_USERS]);
    },
  });

  const deactivateAccount = useMutation({
    mutationFn: ({ userId }) => userService.deactivateAccount({ userId }),
    onSuccess: async (data) => {
      alertBus.showAlert(
        {
          title: `An account has been deactivated.`,
          message: data.message,
        },
        { color: "green" }
      );

      queryClient.invalidateQueries([queryKeys.ALL_USERS]);
    },
  });

  const restoreAccount = useMutation({
    mutationFn: ({ userId }) => userService.restoreAccount({ userId }),
    onSuccess: async (data) => {
      alertBus.showAlert(
        {
          title: `An account has been restored.`,
          message: data.message,
        },
        { color: "green" }
      );

      queryClient.invalidateQueries([queryKeys.ALL_USERS]);
    },
  });

  const removeAccount = useMutation({
    mutationFn: ({ userId }) => userService.removeAccount({ userId }),
    onSuccess: async (data) => {
      alertBus.showAlert(
        {
          title: "A user has been removed.",
          message: data.message,
        },
        { color: "green" }
      );
      queryClient.invalidateQueries([queryKeys.ALL_USERS]);
    },
  });

  return {
    changePassword: changePassword.mutate,
    isChangePasswordPending: changePassword.isPending,

    deactivateAccount: deactivateAccount.mutate,
    isDeactivateAccountPending: deactivateAccount.isPending,

    restoreAccount: restoreAccount.mutate,
    isRestoreAccountPending: restoreAccount.isPending,

    removeAccount: removeAccount.mutate,
    isRemoveAccountPending: removeAccount.isPending,
  };
};
