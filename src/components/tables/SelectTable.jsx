import { useState } from "react";
import cx from "clsx";
import {
  Checkbox,
  Group,
  ScrollArea,
  Table,
  Text,
  Paper,
  Box,
} from "@mantine/core";
import classes from "./Table.module.css";

export default function SelectTable({ items, props, children }) {
  const data = [...items];
  const [selection, setSelection] = useState([]);
  const [required, setRequired] = useState([]);

  const toggleRow = (id) => {
    setRequired((prev) => prev.filter((item) => item !== id));

    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const toggleAll = () => {
    selection.length === data.length ? setRequired([]) : null;

    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    );
  };

  const toggleRequired = (id) => {
    setRequired((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const rows = data.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <Table.Tr
        key={item.id}
        className={cx({ [classes.rowSelected]: selected })}
      >
        <Table.Td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
          />
        </Table.Td>
        <Table.Td>
          <Checkbox
            checked={required.includes(item.id)}
            // disabled={!selection.includes(item.id)}
            onChange={() => toggleRequired(item.id)}
            style={{ display: selection.includes(item.id) ? "block" : "none" }}
          />
        </Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Text size="sm" fw={500}>
              {item.label}
            </Text>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Paper withBorder pb="md" radius="lg" {...props}>
      <Box mb="lg">{children}</Box>
      <ScrollArea>
        <Table verticalSpacing="sm" miw={800} layout="fixed">
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: 150 }}>
                <Group>
                  <Checkbox
                    onChange={toggleAll}
                    checked={selection.length === data.length}
                    indeterminate={
                      selection.length > 0 && selection.length !== data.length
                    }
                  />
                  Select all
                </Group>
              </Table.Th>
              <Table.Th style={{ width: 150 }}>Required</Table.Th>
              <Table.Th>Subtest</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
}
