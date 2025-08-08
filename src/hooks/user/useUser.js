// services
import { useQuery } from "@tanstack/react-query";
import { userService } from "../../services/userService";
import { tokenService } from "../../services/tokenService";

const queryKeys = {
  CURRENT_USER: "current_user",
};

export const useUser = () => {
  const hasTokens =
    tokenService.getAccessToken() && tokenService.getRefreshToken();

  // runs only if tokens exist
  const getLoggedInUser = useQuery({
    queryKey: [queryKeys.CURRENT_USER],
    queryFn: userService.getLoggedInUser,
    staleTime: 5 * 60 * 1000,
    enabled: !!hasTokens,
    retry: false,
  });

  console.log("GET LOGGED USER");

  return { getLoggedInUser };
};
