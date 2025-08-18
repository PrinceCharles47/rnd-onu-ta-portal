// components
import { SimpleGrid, Stack, Text, Table, Group, keys } from "@mantine/core";
import AnalyticsCard from "../../components/cards/AnalyticsCard";
import ProtectedPageWrapper from "../../components/wrappers/ProtectedPageWrapper";
import GenericBtn from "../../components/buttons/GenericBtn";
import SearchTable from "../../components/tables/SearchTable";
import AddONUModal from "../../components/modals/AddONUModal";
import ONUListRows from "../../components/tables/rows/ONUListRows";
import ONUFilterModal from "../../components/modals/ONUFilterModal";

// hooks
import { useMemo, useState } from "react";
import { useONU } from "../../hooks/onu/useONUs";

import { dashBoardPageConfig } from "../../utils/page-configs/dashboardPageConfig";

const normalizeONUData = (onus) =>
  onus.map((onu) => ({
    id: onu.id,
    name: onu.name,
    model: onu.model,
    wifiType: dashBoardPageConfig.wifiType[onu.wifiType],
    ontType: onu.ontType.toUpperCase(),
    status: dashBoardPageConfig.status[onu.status],
  }));

export default function DashboardPage({}) {
  const [currentTable, setCurrentTable] = useState("active"); // active || archive
  const [filters, setFilters] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { allONUs, isLoading: onuLoading } = useONU({
    isArchived: currentTable === "archive",
    searchVal: search,
    filters,
    page,
  });

  // derived values
  const count = allONUs?.count ?? 0;
  const lastPage = allONUs?.lastPage ?? 1;
  const onusData = allONUs?.data?.onus ?? [];
  const counts = allONUs?.data?.counts ?? {};

  const tableHeaders = useMemo(
    () =>
      dashBoardPageConfig.headers.table.map((header) => (
        <Table.Th key={header}>{header}</Table.Th>
      )),
    []
  );

  const tableData = useMemo(() => normalizeONUData(onusData), [onusData]);

  const tableAnalytics = useMemo(
    () => [
      {
        title: "ONU Count",
        icon: dashBoardPageConfig.icons.router,
        value: counts.onuCount ?? 0,
      },
      {
        title: "Pending IOF",
        icon: dashBoardPageConfig.icons.pendingIof,
        value: counts.pendingIofCount ?? 0,
      },
      {
        title: "Ongoing TA",
        icon: dashBoardPageConfig.icons.ongoingTa,
        value: counts.ongoingTaCount ?? 0,
      },
      {
        title: "Completed",
        icon: dashBoardPageConfig.icons.completed,
        value: counts.typeApprovedCount ?? 0,
      },
    ],
    [counts]
  );

  const resetONUParams = () => {
    setPage(1);
    setSearch("");
    setFilters(null);
  };

  const handleTableChange = () => {
    setCurrentTable((prev) => (prev === "active" ? "archive" : "active"));
    resetONUParams();
  };

  const handleSetFilters = (val) => {
    resetONUParams();
    setFilters(val);
  };

  return (
    <ProtectedPageWrapper header={dashBoardPageConfig.headers.page}>
      <Stack mb="xl">
        <Group justify="space-between">
          <Text fz="sm" fw={700}>
            {`${allONUs ? allONUs.count : 0} total ${
              currentTable === "active" ? "active" : "archived"
            } ONUs`}
          </Text>

          <Group gap="xs">
            <GenericBtn
              onClick={handleTableChange}
              {...dashBoardPageConfig.tableToggleProps[currentTable]}
            />
          </Group>
        </Group>

        <SimpleGrid cols={{ base: 2, xs: 2, md: 4 }}>
          {tableAnalytics.map((item) => (
            <AnalyticsCard
              key={item.title}
              title={item.title}
              value={item.value}
              icon={item.icon}
            />
          ))}
        </SimpleGrid>
        <SearchTable
          rows={<ONUListRows items={tableData} currentTable={currentTable} />}
          headers={tableHeaders}
          loading={onuLoading}
          onSearch={setSearch}
          filter={
            <ONUFilterModal
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
            pageItemsLimit: dashBoardPageConfig.pageItemsLimit,
          }}
          actions={<AddONUModal />}
        />
      </Stack>
    </ProtectedPageWrapper>
  );
}
