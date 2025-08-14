import {
  Group,
  Table,
  Text,
  Pagination,
  Loader,
  TextInput,
  Paper,
} from "@mantine/core";
import UsersFilterModal from "../modals/UsersFilterModal";
import IconBtn from "../buttons/IconBtn";
import { IconSearch, IconArchive } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function SearchTable({
  rows,
  headers,
  loading,
  onSearch,
  onFilter,
  pagination, // group prop
  actions, // added table functionalities
}) {
  // for pagination
  const { page, total, pageCount, onPaginate, pageItemsLimit, withPagination } =
    pagination || {};

  const message = `Showing ${pageItemsLimit * (page - 1) + 1} - ${Math.min(
    total,
    pageItemsLimit * page
  )} of ${total}`;

  // for search
  const [search, setSearch] = useState("");

  useEffect(() => {
    // debouncing for search. search will only trigger 5 milliseconds after the user is done typing.
    const handler = setTimeout(() => onSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search, onSearch]);

  return (
    <Paper withBorder py="md" radius="lg">
      <Group mb="md" mx="md" gap="xs">
        <TextInput
          flex={1}
          size="md"
          radius="md"
          value={search}
          variant="filled"
          placeholder="Search by any field"
          onChange={(e) => setSearch(e.target.value)}
          leftSection={<IconSearch size={20} />}
        />
        <UsersFilterModal onFilter={onFilter} />
        {actions}
      </Group>

      <Table.ScrollContainer minWidth={900}>
        <Table verticalSpacing="md" horizontalSpacing="lg">
          <Table.Thead>
            <Table.Tr>{headers}</Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {loading ? <TableLoader span={headers.length} /> : rows}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      {withPagination && (
        <Group mx="md" justify="flex-end">
          <Text size="xs">{message}</Text>
          <Pagination
            total={pageCount}
            value={page}
            onChange={onPaginate}
            withPages={false}
          />
        </Group>
      )}
    </Paper>
  );
}

function TableLoader({ span }) {
  return (
    <Table.Tr>
      <Table.Td colSpan={span}>
        <Group justify="center">
          <Loader />
        </Group>
      </Table.Td>
    </Table.Tr>
  );
}
