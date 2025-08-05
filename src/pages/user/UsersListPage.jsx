import {
  Paper,
  Text,
  SimpleGrid,
  Group,
  Stack,
  Divider,
  Button,
  ActionIcon,
  Progress,
} from "@mantine/core";
import { useMemo, useState } from "react";

import PageWrapper from "../../components/wrappers/PageWrapper";
import StatusChip from "../../components/chips/StatusChip";
import AccordionLayout from "../../components/accordion/AccordionLayout";
import SelectTable from "../../components/tables/SelectTable";
import GenericBtn from "../../components/buttons/GenericBtn";

import { TEST_CASES } from "../../utils/staticTestData";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

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

export default function UsersListPage({}) {
  const [page, setPage] = useState(1);

  const previous = () => setPage((prev) => (prev > 1 ? prev - 1 : prev));
  const next = () =>
    setPage((prev) => (prev < TEST_CASES.length ? prev + 1 : prev));

  const testCases = TEST_CASES.map((item, i) => (
    <SelectTable key={i} items={item.subtests} props={{ withBorder: false }} />
  ));

  return (
    <PageWrapper header={pageHeader}>
      <Paper radius="lg">
        <Stack mb="xl">
          <AccordionLayout
            items={[onuDetailsAccordionItem]}
            props={{ defaultValue: {} }}
          />
          <Paper withBorder pb="md" radius="lg" style={{ overflow: "hidden" }}>
            <Paper m="md">
              <TitleBar
                label={TEST_CASES[page - 1].label}
                onPrev={previous}
                onNext={next}
              />
            </Paper>

            <Progress
              visibleFrom="md"
              mb="lg"
              size="xs"
              value={page * 10}
            ></Progress>

            <Paper mx="md">
              {testCases.length > 0 ? testCases[page - 1] : null}
            </Paper>
          </Paper>

          <Group gap="sm" justify="end">
            <GenericBtn
              label="Assign all"
              onClick={() => {}}
              props={{ variant: "outline" }}
            />
            <GenericBtn label="Submit" onClick={() => {}} />
          </Group>
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

function TitleBar({ label, onPrev, onNext }) {
  return (
    <Group align="end" justify="space-between">
      <Text>{label}</Text>
      <Group gap="xs">
        <ActionIcon size="lg" onClick={onPrev} radius="xl">
          <IconChevronLeft size={20} stroke={1.5} />
        </ActionIcon>

        <ActionIcon size="lg" onClick={onNext} radius="xl">
          <IconChevronRight size={20} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Group>
  );
}
