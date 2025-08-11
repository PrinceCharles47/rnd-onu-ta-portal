import { useMutation, useQueryClient } from "@tanstack/react-query";

// services
import { authService } from "../../services/authService";

const queryKeys = {
  CURRENT_USER: "current_user",
};

export const useAuth = () => {
  const queryClient = useQueryClient();

  const logIn = useMutation({
    mutationFn: authService.logIn,
    onSuccess: async () =>
      queryClient.invalidateQueries([queryKeys.CURRENT_USER]),
  });

  const logOut = useMutation({
    mutationFn: authService.logOut,
    onSuccess: () => queryClient.invalidateQueries([queryKeys.CURRENT_USER]),
  });

  return {
    logIn: logIn.mutate,
    logOut: logOut.mutate,
    logInStatus: logIn.status,
    logOutStatus: logOut.status,
  };
};
