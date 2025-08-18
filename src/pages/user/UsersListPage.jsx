// components
import { Stack, Table, Text, Group } from "@mantine/core";
import ProtectedPageWrapper from "../../components/wrappers/ProtectedPageWrapper";
import SearchTable from "../../components/tables/SearchTable";
import UsersListRows from "../../components/tables/rows/UsersListRows";
import GenericBtn from "../../components/buttons/GenericBtn";
import UsersFilterModal from "../../components/modals/UsersFilterModal";
import AddUserModal from "../../components/modals/AddUserModal";

// hooks
import { useMemo, useState } from "react";
import { useUsers } from "../../hooks/user/useUsers";

import { usersListPageConfig } from "../../utils/page-configs/usersListPageConfig";

// formats data to get only the necessary fields before it gets used by the table
const normalizeUsersData = (arr) =>
  arr.map((user) => {
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

export default function UsersListPage() {
  const [currentTable, setCurrentTable] = useState("active"); // active || archive
  const [filters, setFilters] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { allUsers, isLoading: usersLoading } = useUsers({
    isArchived: currentTable === "archive",
    searchVal: search,
    filters,
    page,
  });

  // derived values
  const count = allUsers?.count ?? 0;
  const lastPage = allUsers?.lastPage ?? 1;
  const usersData = allUsers?.data ?? [];

  const tableHeaders = useMemo(
    () =>
      usersListPageConfig.headers.table.map((header) => (
        <Table.Th key={header}>{header}</Table.Th>
      )),
    []
  );

  const tableData = useMemo(() => normalizeUsersData(usersData), [usersData]);

  const resetUsersParams = () => {
    setPage(1);
    setSearch("");
    setFilters(null);
  };

  const handleTableChange = () => {
    setCurrentTable((prev) => (prev === "active" ? "archive" : "active"));
    resetUsersParams();
  };

  const handleSetFilters = (val) => {
    resetUsersParams();
    setFilters(val);
  };

  return (
    <ProtectedPageWrapper header={{ title: usersListPageConfig.headers.page }}>
      <Stack mb="xl">
        <Group justify="space-between">
          <Text fz="sm" fw={700}>
            {`${allUsers ? allUsers.count : 0} total ${
              currentTable === "active" ? "active" : "archived"
            } users`}
          </Text>

          <Group gap="xs">
            <GenericBtn
              onClick={handleTableChange}
              {...usersListPageConfig.tableToggleProps[currentTable]}
            />
          </Group>
        </Group>

        <SearchTable
          rows={<UsersListRows items={tableData} currentTable={currentTable} />}
          headers={tableHeaders}
          loading={usersLoading}
          onSearch={setSearch}
          filter={
            <UsersFilterModal
              onFilter={(val) => handleSetFilters(val)}
              isEmpty={!filters || !keys(filters).length}
            />
          }
          pagination={{
            page,
            withPagination: true,
            onPaginate: setPage,
            total: count,
            pageCount: lastPage,
            pageItemsLimit: usersListPageConfig.pageItemsLimit,
          }}
          actions={<AddUserModal />}
        />
      </Stack>
    </ProtectedPageWrapper>
  );
}
