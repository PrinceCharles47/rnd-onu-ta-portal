import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { alertBus } from "./alertBus";
import { tokenService } from "../services/tokenService";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      const hasTokens =
        tokenService.getAccessToken() && tokenService.getRefreshToken();

      if (hasTokens) {
        alertBus.showAlert(
          {
            title: error.response?.data?.error || "Error",
            message: error.message,
          },
          { color: "red" }
        );
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, variables, context, mutation) => {
      const hasTokens =
        tokenService.getAccessToken() && tokenService.getRefreshToken();

      if (hasTokens) {
        alertBus.showAlert(
          {
            title: error.response?.data?.error || "Error",
            message: error.message,
          },
          { color: "red" }
        );
      }
    },
  }),
});
