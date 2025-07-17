import {
  Paper,
  FileInput,
  Table,
  Stack,
  Text,
  Radio,
  TextInput,
  Group,
  ScrollArea,
  Divider,
} from "@mantine/core";

const tableData = [
  {
    parameter: "Type",
    requiredVal: "IP",
  },
  {
    parameter: "Version",
    requiredVal: "IPv4/6",
  },
  {
    parameter: "NAT",
    requiredVal: "Off",
  },
  {
    parameter: "IP Address",
    requiredVal: "Based on screenshot",
  },
  {
    parameter: "etc",
    requiredVal: "etc",
  },
];

export default function ONUWANStatusForm({}) {
  const rows = tableData.map((row) => (
    <Table.Tr>
      <Table.Td>{row.parameter}</Table.Td>
      <Table.Td>{row.requiredVal}</Table.Td>
      <Table.Td>
        <Radio variant="outline" onChange={() => {}} />
      </Table.Td>
      <Table.Td>
        <Radio variant="outline" onChange={() => {}} />
      </Table.Td>
      <Table.Td>
        <Radio variant="outline" onChange={() => {}} />
      </Table.Td>
      <Table.Td>
        <TextInput placeholder="N/A" radius="md" />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper withBorder p="md" radius="lg">
      <Stack>
        <FileInput
          label="Please upload WAN connection status - Web GUI settings"
          description="Accepts .jpg, .jpeg"
          placeholder="Choose file"
          radius="md"
          w="50%"
        />

        <Text mt="md" c="dimmed">
          Please complete the form based on your screenshot.
        </Text>

        <Paper withBorder p="md" radius="md">
          <Group justify="center">
            <Text fw={700} fz="sm">
              Checklist
            </Text>
          </Group>
          <Divider mt="md" />
          <ScrollArea>
            <Table horizontalSpacing="md" verticalSpacing="xs" miw={800}>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Parameter</Table.Th>
                  <Table.Th>Required Value</Table.Th>
                  <Table.Th>Passed</Table.Th>
                  <Table.Th>Failed</Table.Th>
                  <Table.Th>Others</Table.Th>
                  <Table.Th>Remarks (If any)</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </ScrollArea>
        </Paper>
      </Stack>
    </Paper>
  );
}
