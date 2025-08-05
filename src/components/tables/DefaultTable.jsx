import { useEffect, useState, useMemo } from "react";
import { Table, Group, Text, Paper, keys } from "@mantine/core";
import TableLayout from "./TableLayout";
import StatusChip from "../chips/StatusChip";

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
  layout,
  props,
}) {
  const [sortedData, setSortedData] = useState(items);
  const [chunkedData, setChunkedData] = useState([]);
  const DATA_LIMIT_PER_PAGE = 10;

  useEffect(() => {
    setSortedData(items);
  }, [items]);

  useEffect(() => {
    setChunkedData(chunkData(DATA_LIMIT_PER_PAGE, sortedData));
  }, [sortedData]);

  // 2D array containing the table rows.
  const rows = useMemo(() => {
    // numeric strings will be returned first in the array followed by strings.
    // the order of string keys is based on the order they appear in the object
    const itemKeys = items.length > 0 && keys(items[0]);

    if (itemKeys.length === 0) return [];
    return chunkedData.map((page) => {
      return page.map((row, rowIndex) => (
        <Table.Tr key={`row-${row[itemKeys[0]] ?? rowIndex}-${rowIndex}`}>
          {itemKeys.map((key) => {
            if (key === "status") {
              return (
                <Table.Td key={`cell-${key}`}>
                  <StatusChip status={row[key]} />
                </Table.Td>
              );
            }
            return (
              <Table.Td key={`cell-${key}`}>
                <Text fz="xs">{row[key]}</Text>
              </Table.Td>
            );
          })}
        </Table.Tr>
      ));
    });
  }, [chunkedData, items]);

  return (
    <Paper withBorder p="md" radius="lg" {...props}>
      <Group justify="space-between" mb="md">
        <div>
          <Text fw={500}>{title}</Text>
          <Text visibleFrom="md" fz="sm" c="dimmed">
            {subtitle}
          </Text>
        </div>
        {action && action}
      </Group>
      <TableLayout
        data={items}
        rows={rows}
        headers={headers}
        layout={layout}
        paginationLimit={DATA_LIMIT_PER_PAGE}
        handleSortedData={setSortedData}
        disableSearch={disableSearch}
      />
    </Paper>
  );
}
