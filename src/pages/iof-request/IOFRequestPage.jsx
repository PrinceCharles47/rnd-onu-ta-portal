import {
  Paper,
  Text,
  SimpleGrid,
  Group,
  Stack,
  Divider,
  Button,
} from "@mantine/core";

import PageWrapper from "../../components/wrappers/PageWrapper";
import StatusChip from "../../components/chips/StatusChip";
import AccordionLayout from "../../components/accordion/AccordionLayout";
import SelectTable from "../../components/tables/SelectTable";

import { TEST_CASES } from "../../utils/staticTestData";

const pageHeader = {
  title: "IOF request for F611C (WiFi 6)",
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

const onuDetailsAccordionItem = {
  label: onuDetails.name,
  description: <StatusChip status={onuDetails.status} />,
  panel: <ONUDetails items={onuDetails.details} />,
};

const testCaseAccordionItems = TEST_CASES.map((item) => {
  return {
    label: item.label,
    description: `${item.subtests.length} subtest cases`,
    panel: <SelectTable items={item.subtests} />,
  };
});

export default function IOFRequestPage({}) {
  return (
    <PageWrapper header={pageHeader}>
      <Paper radius="lg">
        <Stack>
          <AccordionLayout
            items={[onuDetailsAccordionItem]}
            props={{ defaultValue: {} }}
          />

          <Group px="md" mt="lg" justify="space-between">
            <div>
              <Text fw={500}>Assign test cases for the selected ONU.</Text>
              <Text fz="sm" c="dimmed">
                Click on each test case to reveal subtest cases.
              </Text>
            </div>

            <Group>
              <Button radius="md" variant="outline">Assign all</Button>
              <Button radius="md">Submit</Button>
            </Group>
          </Group>

          <AccordionLayout
            items={testCaseAccordionItems}
            props={{ defaultValue: {} }}
          />
        </Stack>
      </Paper>
    </PageWrapper>
  );
}

function ONUDetails({ items }) {
  return (
    <>
      <Divider mb="md" />
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {items.map((item) => (
          <Group key={item.label}>
            <Text fw={500} fz="sm" c="dimmed">
              {item.label}:
            </Text>
            <Text fz="sm">{item.value}</Text>
          </Group>
        ))}
      </SimpleGrid>
    </>
  );
}
