import { useEffect, useState, useMemo } from "react";
import { Table, Group, Text, Paper, keys } from "@mantine/core";
import TableLayout from "./TableLayout";

/**
 * this function creates a 2D array that contains all table data.
 * the length of each array in this array is equal to the pagination limit size.
 * the items of each array in this array will be rendered per table page.
 */
const chunkData = (size, arr) => {
  if (!arr.length) {
    return [];
  }

  const head = arr.slice(0, size);
  const tail = arr.slice(size);

  return [head, ...chunkData(size, tail)];
};

export default function DefaultTable({
  items,
  headers,
  action,
  title,
  subtitle,
  disableSearch = false,
}) {
  const [sortedData, setSortedData] = useState(items);
  const [chunkedData, setChunkedData] = useState([]);
  const DATA_LIMIT_PER_PAGE = 10;

  useEffect(() => {
    setChunkedData(chunkData(DATA_LIMIT_PER_PAGE, sortedData));
  }, [sortedData]);

  // numeric strings will be returned first in the array followed by strings.
  // the order of string keys is based on the order they appear in the object
  const itemKeys = keys(items[0]);

  // 2D array containing the table rows.
  const rows = useMemo(() => {
    return chunkedData.map((page) => {
      return page.map((row, rowIndex) => (
        <Table.Tr key={`row-${row[itemKeys[0]] ?? rowIndex}`}>
          {itemKeys.map((key) => (
            <Table.Td key={`cell-${key}`}>{row[key]}</Table.Td>
          ))}
        </Table.Tr>
      ));
    });
  }, [chunkedData, itemKeys]);

  return (
    <Paper withBorder p="md" radius="lg">
      <Group justify="space-between" mb="md">
        <div>
          <Text fw={500}>{title}</Text>
          <Text fz="sm" c="dimmed">
            {subtitle}
          </Text>
        </div>
        {action && action}
      </Group>
      <TableLayout
        data={items}
        rows={rows}
        headers={headers}
        paginationLimit={DATA_LIMIT_PER_PAGE}
        handleSortedData={setSortedData}
        disableSearch={disableSearch}
      />
    </Paper>
  );
}
