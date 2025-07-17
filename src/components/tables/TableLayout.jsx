/**
 * this component serves as a reusable table.
 * it receives rows (2D array of components) as props in order to have full control on the appearance of each row.
 * the reason why it should be a 2D array of rows is because each array represents the contents of each page for pagination.
 * e.g. adding actions/buttons, other components on each row.
 * this table provides column sorting, searching, and pagination.
 *
 * COMMENT: this component turned into a complex one. mygoodness - pchrls
 */

import { useMemo } from "react";
import {
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconSelector,
} from "@tabler/icons-react";
import {
  Center,
  Group,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
  Paper,
  Pagination,
} from "@mantine/core";
import classes from "./Table.module.css";

import { useTableControls } from "../../hooks/useTableControls";

export default function TableLayout({
  data,
  rows,
  label,
  headers,
  paginationLimit,
  handleSortedData,
  disableSearch = false
}) {
  const {
    page,
    search,
    sortBy,
    reverseSortDirection,
    setPage,
    setSorting,
    getPaginationDetails,
    handleSearchChange,
  } = useTableControls({ data, handleSortedData });

  const { totalPages, message } = getPaginationDetails(paginationLimit);

  const tableHeaders = useMemo(() => {
    return headers.map((header) => {
      const props = {
        withSortIcon: header.withSort,
        reversed: reverseSortDirection,
        sorted: header.withSort && sortBy === header.name.toLowerCase(),
        onSort: header.withSort
          ? () => setSorting(header.name.toLowerCase())
          : undefined,
      };

      return (
        // Th is a custom component (at the bottom of this file) for Table.Th of Mantine.
        <Th key={header.name} {...props}>
          {header.name}
        </Th>
      );
    });
  }, [sortBy, reverseSortDirection]);

  return (
    <>
      {!disableSearch && (
        <TextInput
          placeholder="Search by any field"
          mb="md"
          radius="md"
          leftSection={<IconSearch size={16} stroke={1.5} />}
          value={search}
          onChange={(e) => handleSearchChange(e.currentTarget.value)}
        />
      )}

      <ScrollArea>
        <Table
          horizontalSpacing="md"
          verticalSpacing="sm"
          miw={800}
          layout="fixed"
        >
          <Table.Tbody>
            <Table.Tr>{tableHeaders}</Table.Tr>
          </Table.Tbody>
          <Table.Tbody>
            {rows.length > 0 ? (
              rows[page - 1]
            ) : (
              <Table.Tr>
                <Table.Td colSpan={headers.length}>
                  <Text fw={500} ta="center">
                    Nothing found
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>

      <Group mt="md" justify="flex-end">
        <Text size="sm">{message}</Text>
        <Pagination
          total={totalPages}
          value={page}
          onChange={setPage}
          withPages={false}
        />
      </Group>
    </>
  );
}

function Th({ children, reversed, sorted, withSortIcon, onSort = () => {} }) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        {withSortIcon ? (
          <Group justify="space-between">
            <Text fw={700} fz="sm">
              {children}
            </Text>
            <Center className={classes.icon}>
              {withSortIcon && <Icon size={16} stroke={1.5} />}
            </Center>
          </Group>
        ) : (
          <Text fw={700} fz="sm">
            {children}
          </Text>
        )}
      </UnstyledButton>
    </Table.Th>
  );
}
