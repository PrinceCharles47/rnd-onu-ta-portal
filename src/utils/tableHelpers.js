import { keys } from "@mantine/core";

export function filterData(data, search) {
  // returns an array of data where each data contains the "search" string on one or more of its property values.
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => {
      if (typeof item[key] !== "object") {
        return item[key].toLowerCase().includes(query);
      }
    })
  );
}

export function sortData(data, payload) {
  // this function sorts the data first then passed it to the filterData function to filter based on "search" string.
  const { sortBy } = payload;

  // runs if the table is not sorted by any headers.
  if (!sortBy) {
    return filterData(data, payload.search);
  }

  // else, this runs of course
  return filterData(
    // sorts the data in ascending/descending order based on the chosen header.
    [...data].sort((a, b) => {
      const valA = a[sortBy] ?? ""; // fallback to empty string
      const valB = b[sortBy] ?? "";
      if (payload.reversed) {
        return valB[sortBy].localeCompare(valA[sortBy]);
      }

      return valA[sortBy].localeCompare(valB[sortBy]);
    }),
    payload.search
  );
}
