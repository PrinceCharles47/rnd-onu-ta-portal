// components
import { Stack, Table, Text, Group } from "@mantine/core";
import ProtectedPageWrapper from "../../components/wrappers/ProtectedPageWrapper";
import SearchTable from "../../components/tables/SearchTable";
import UsersListRows from "../../components/tables/rows/UsersListRows";
import NewUserForm from "../../components/forms/NewUserForm";
import GenericBtn from "../../components/buttons/GenericBtn";
import IconBtn from "../../components/buttons/IconBtn";

import { IconPlus } from "@tabler/icons-react";

// hooks
import { useMemo, useState } from "react";
import { useUsers } from "../../hooks/user/useUsers";
import { openModal } from "../../utils/modal";

const CONFIG = {
  headers: {
    page: "TA Portal Users List",
    table: ["Username", "Email", "Company", "Department", "Role"],
  },
  pageItemsLimit: 10, // 10 by default. can be used in the pageSize param of getUsers endpoint to display more users per page of table
  tableProps: {
    activeUsers: {
      label: "View Archive",
      props: { w: 135 },
    },
    archivedUsers: {
      label: "View Users",
      props: { w: 135 },
    },
  },
};

const normalizeUsersData = (arr) => {
  // formats data to get only the necessary fields before it gets used by the table
  return arr.map((user) => {
    const userProfile = user.profile;
    return {
      id: userProfile.id,
      email: userProfile.email,
      companyName: userProfile.companyName,
      department: userProfile.department,
      role: userProfile.role,
      name: {
        fullName: `${userProfile.lastName}, ${userProfile.firstName} ${userProfile.middleName}`,
        username: userProfile.username,
      },
    };
  });
};

export default function UsersListPage() {
  const [currentTable, setCurrentTable] = useState("activeUsers"); // activeUsers || archivedUsers
  const [filters, setFilters] = useState(null);
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);

  const { allUsers, isLoading: usersLoading } = useUsers({
    isActive: currentTable === "activeUsers",
    searchVal: search,
    filters,
    page,
  });

  const tableHeaders = useMemo(
    () =>
      CONFIG.headers.table.map((header) => (
        <Table.Th key={header}>{header}</Table.Th>
      )),
    []
  );

  const tableData = useMemo(() => {
    if (!allUsers) return [];
    return normalizeUsersData(allUsers.data);
  }, [allUsers]);

  const resetUsersParams = () => {
    setPage(1);
    setSearch(null);
    setFilters(null);
  };

  const handleTableChange = () => {
    setCurrentTable((prev) =>
      prev === "activeUsers" ? "archivedUsers" : "activeUsers"
    );
    resetUsersParams();
  };

  const handleSetFilters = (val) => {
    resetUsersParams();
    setFilters(val);
  };

  return (
    <ProtectedPageWrapper header={{ title: CONFIG.headers.page }}>
      <Stack mb="xl">
        <Group justify="space-between">
          <Text fz="sm" fw={700}>
            {`${allUsers ? allUsers.count : 0} total ${
              currentTable === "activeUsers" ? "active" : "archived"
            } users`}
          </Text>

          <Group gap="xs">
            <GenericBtn
              onClick={handleTableChange}
              {...CONFIG.tableProps[currentTable]}
            />
          </Group>
        </Group>

        <SearchTable
          rows={<UsersListRows items={tableData} currentTable={currentTable} />}
          headers={tableHeaders}
          loading={usersLoading}
          onSearch={setSearch}
          onFilter={(val) => handleSetFilters(val)}
          pagination={{
            page,
            withPagination: true,
            onPaginate: setPage,
            total: allUsers ? allUsers.count : 0,
            pageCount: allUsers ? allUsers.lastPage : 1,
            pageItemsLimit: CONFIG.pageItemsLimit,
          }}
          actions={
            <IconBtn
              tooltip="Add user"
              icon={IconPlus}
              onClick={() =>
                openModal({
                  title: "Add a new user",
                  children: <NewUserForm />,
                })
              }
            />
          }
        />
      </Stack>
    </ProtectedPageWrapper>
  );
}
