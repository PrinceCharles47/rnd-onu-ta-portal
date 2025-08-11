// services
import { useQuery } from "@tanstack/react-query";
import { userService } from "../../services/userService";

const queryKeys = {
  CURRENT_USER: "current_user",
};

export const useUser = () => {
  const getLoggedInUser = useQuery({
    queryKey: [queryKeys.CURRENT_USER],
    queryFn: userService.getLoggedInUser,
    staleTime: 1000 * 60 * 5,
    cacheTime: 0,
    retry: false,
  });

  return {
    currentUser: getLoggedInUser.data,
    isLoading: getLoggedInUser.isLoading,
    isError: getLoggedInUser.isError,
  };
};
