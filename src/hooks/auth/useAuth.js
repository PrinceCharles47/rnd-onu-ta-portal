import { useMutation, useQueryClient } from "@tanstack/react-query";

// services
import { authService } from "../../services/authService";

const queryKeys = {
  CURRENT_USER: "current_user",
};

export const useAuth = () => {
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: authService.login,
    onSuccess: async () =>
      queryClient.invalidateQueries([queryKeys.CURRENT_USER]),
  });

  const logout = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => queryClient.invalidateQueries([queryKeys.CURRENT_USER]),
  });

  return { login, logout };
};
