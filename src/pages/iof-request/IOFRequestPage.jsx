import {
  Paper,
  Text,
  SimpleGrid,
  Group,
  Stack,
  Divider,
  Collapse,
} from "@mantine/core";

import { IconChevronUp, IconChevronDown } from "@tabler/icons-react";

import PageWrapper from "../../components/wrappers/PageWrapper";
import StatusChip from "../../components/chips/StatusChip";

import { useDisclosure } from "@mantine/hooks";
import classes from "../../styles/IOFRequest.module.css";

const pageHeader = {
  title: "IOF request for F611C (WiFi 6)",
};

const icon = (state) => {
  if (state === "up") {
    return <IconChevronUp size={15} />;
  }
  return <IconChevronDown size={15} />;
};

const onuDetails = {
  name: "F611C (WiFi 6)",
  status: "pendingIOF",
  details: [
    { label: "ONU Name", value: "Sample" },
    { label: "Model", value: "Sample" },
    { label: "WiFi Type", value: "Sample" },
    { label: "Firmware", value: "Sample" },
    { label: "ONT Type", value: "Sample" },
    { label: "Product ID", value: "Sample" },
    { label: "Vendor ID", value: "Sample" },
    { label: "Equipment ID", value: "Sample" },
    { label: "SN Format", value: "Sample" },
    { label: "Software Version", value: "Sample" },
    { label: "PON Chipset", value: "Sample" },
    { label: "ONT Interface", value: "Sample" },
    { label: "TCONT Numbers", value: "Sample" },
    { label: "QOS-Queue Numbers", value: "Sample" },
    { label: "IGMP Version", value: "Sample" },
    { label: "VOIP Protocol", value: "Sample" },
    { label: "3rd Party OLT Support", value: "Sample" },
  ],
};

export default function IOFRequestPage({}) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <PageWrapper header={pageHeader}>
      <Paper withBorder mx="md" radius="lg">
        <Paper p="md" onClick={toggle} className={classes.collapseTrigger}>
          <Group justify="space-between">
            <Stack gap="5px">
              <Text fw={500}>{onuDetails.name}</Text>
              <StatusChip status={onuDetails.status} />
            </Stack>
            {icon(opened ? "up" : "down")}
          </Group>
        </Paper>

        <Paper mx="md" mb="md">
          <Collapse in={opened}>
            <Divider mb="md" />
            <ONUDetails items={onuDetails.details} />
          </Collapse>
        </Paper>
      </Paper>
    </PageWrapper>
  );
}

function ONUDetails({ items }) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }}>
      {items.map((item) => (
        <Group key={item.label}>
          <Text fw={500} c="dimmed">
            {item.label}:
          </Text>
          <Text>{item.value}</Text>
        </Group>
      ))}
    </SimpleGrid>
  );
}
