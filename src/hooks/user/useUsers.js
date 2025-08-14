// services
import { useQuery } from "@tanstack/react-query";
import { userService } from "../../services/userService";

const queryKeys = {
  ALL_USERS: "all_users",
  ALL_ARCHIVED_USERS: "all_archived_users",
  ALL_FILTERED_USERS: "all_filtered_users",
};

export const useUsers = ({ page, isActive, searchVal, filters }) => {
  const getUsers = useQuery({
    queryKey: [
      queryKeys.ALL_USERS,
      {
        page,
        isActive,
        search: filters ? null : searchVal || null,
        filters: searchVal ? null : filters || null,
      },
    ],
    queryFn: () => userService.getUsers({ page, isActive, searchVal, filters }),
  });

  return {
    allUsers: getUsers.data,
    isLoading: getUsers.isLoading,
    isError: getUsers.isError,
  };
};
