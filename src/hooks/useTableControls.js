import { useMemo, useState } from "react";
import { sortData } from "../utils/tableHelpers";

export const useTableControls = ({ data, handleSortedData }) => {    
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [filteredDataLength, setFilteredDataLength] = useState(data?.length);
  const [page, setPage] = useState(1);

  // updates sorted data after search/sort
  const updateSortedData = ({ sortBy, reversed, search }) => {
    const sorted = sortData(data, { sortBy, reversed, search });
    setFilteredDataLength(sorted.length);
    handleSortedData(sorted);
  };

  // controls what is being displayed in the pagination at the bottom of the table
  const getPaginationDetails = (paginationLimit) => {
    return useMemo(() => {
      const total = filteredDataLength;
      const totalPages = Math.ceil(total / paginationLimit);
      const message = `Showing ${paginationLimit * (page - 1) + 1} - ${Math.min(
        total,
        paginationLimit * page
      )} of ${total}`;

      return { totalPages, message };
    }, [filteredDataLength, page, paginationLimit]);
  };

  // runs when the table headers got clicked for sorting either in ascending/descending order.
  const setSorting = (field) => {    
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    updateSortedData({ sortBy: field, reversed, search });
  };

  // runs on every changes in the search value of the search bar (TextInput).
  const handleSearchChange = (val) => {
    setSearch(val);
    setPage(1);
    updateSortedData({
      sortBy,
      reversed: reverseSortDirection,
      search: val,
    });
  };

  return {
    page,
    search,
    sortBy,
    reverseSortDirection,
    setPage,
    setSorting,
    getPaginationDetails,
    handleSearchChange,
  };
};
