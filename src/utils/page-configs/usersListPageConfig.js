export const usersListPageConfig = {
  headers: {
    page: "TA Portal Users List",
    table: ["Username", "Email", "Company", "Department", "Role"],
  },
  pageItemsLimit: 10, // 10 by default. can be used in the pageSize param of getUsers endpoint to display more users per page of table
  tableToggleProps: {
    active: {
      label: "View Archive",
      props: { w: 135 },
    },
    archive: {
      label: "View Users",
      props: { w: 135 },
    },
  },
};
