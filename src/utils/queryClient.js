import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { tokenService } from "../services/tokenService";
import { alertBus } from "./alertBus";

function shouldShowError(query) {
  const isArchived = query.isArchived(); // Observed by a mounted component
  const isDisabled = query.options.enabled === false;
  const isBackground = !isArchived;

  // If query.options.meta?.silent === true, it's a background/prefetch query we want to ignore
  const isSilent = query.options.meta?.silent === true;

  // Only show if active, not disabled, not background, not marked silent
  return !isDisabled && !isBackground && !isSilent;
}
const errorMessages = {
  SELF_DEACTIVATION: "You have deactivated your account.",
  SELF_DELETION: "You have deleted your account",
};

function redirectToSignIn() {
  setTimeout(() => {
    window.location.href = "/sign-in";
  }, 5000);

  tokenService.clear();
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      const hasTokens =
        tokenService.getAccessToken() && tokenService.getRefreshToken();

      // Ignore if user not logged in or query doesn't qualify
      if (!hasTokens || !shouldShowError(query)) return;

      // if the query has been retried for refreshing tokens (see axios.js file in api folder) and the error is still 401 unauthorized
      if (error.config._retry && error.status === 401) {
        alertBus.showAlert(
          {
            title: "User is unauthorized.",
            message: "Redirecting to sign-in page.",
          },
          { color: "red", loading: true }
        );

        redirectToSignIn();
      }

      // Ignore if still retrying
      if (query.state.fetchFailureCount < (query.options.retry ?? 3)) return;

      alertBus.showAlert(
        {
          title: error.response?.data?.message || "Error",
          message: error.message,
        },
        { color: "red" }
      );
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, variables, context, mutation) => {
      const hasTokens =
        tokenService.getAccessToken() && tokenService.getRefreshToken();

      // if (!hasTokens) return;
      alertBus.showAlert(
        {
          title: error.response?.data?.message || "Error",
          message: error.message,
        },
        { color: "red" }
      );
    },
  }),
});
