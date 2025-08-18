// services
import { useQuery } from "@tanstack/react-query";
import { onuService } from "../../services/onuService";

const queryKeys = {
  ALL_ONU: "all_onu",
};

export const useONU = ({ page, isArchived, searchVal, filters }) => {
  const getONUs = useQuery({
    queryKey: [
      queryKeys.ALL_ONU,
      {
        page,
        isArchived,
        search: searchVal || null,
        filters,
      },
    ],
    queryFn: () => onuService.getONUs({ page, isArchived, searchVal, filters }),
  });

  return {
    allONUs: getONUs.data,
    isLoading: getONUs.isLoading,
    isError: getONUs.isError,
  };
};
