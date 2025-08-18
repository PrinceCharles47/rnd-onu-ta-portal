// services
import { useQuery } from "@tanstack/react-query";
import { userService } from "../../services/userService";

const queryKeys = {
  ALL_USERS: "all_users",
};

export const useUsers = ({ page, isArchived, searchVal, filters }) => {
  const getUsers = useQuery({
    queryKey: [
      queryKeys.ALL_USERS,
      {
        page,
        isArchived,
        search: searchVal || null,
        filters,
      },
    ],
    queryFn: () => userService.getUsers({ page, isArchived, searchVal, filters }),
  });

  return {
    allUsers: getUsers.data,
    isLoading: getUsers.isLoading,
    isError: getUsers.isError,
  };
};
