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
          <Group gap="lg">
            <Checkbox
              checked={selection.includes(item.id)}
              onChange={() => toggleRow(item.id)}
            />
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
        <Table verticalSpacing="sm" miw={800}>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
}
