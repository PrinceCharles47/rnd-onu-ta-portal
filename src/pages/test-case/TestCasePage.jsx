import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

import {
  Container,
  Paper,
  Table,
  ScrollArea,
  Stack,
  FileInput,
  Text,
  Box,
  Group,
  Select,
  ActionIcon,
  Slider,
} from "@mantine/core";

import PageWrapper from "../../components/wrappers/PageWrapper";
import PageHeader from "../../components/headers/PageHeader";
import AccordionLayout from "../../components/accordion/AccordionLayout";
import ChecklistType from "../../components/test-case-types/ChecklistType";
import UploadType from "../../components/test-case-types/UploadType";

import { TEST_CASES } from "../../utils/staticTestData";

import { useEffect, useMemo, useState } from "react";

const pageHeader = {
  title: "Testing for F611C",
  subtitle:
    "RDTA-20250127-Huawer ONU WiFi 6 F611C for FTTX via Nokia OLT & ZTE BRAS",
};

const dropdownOptions = TEST_CASES.map((item) => {
  return item.label;
});

const testTypes = {
  checklist: ChecklistType,
  upload: UploadType,
};

export default function TestCasePage({}) {
  const [selectedTestCase, setSelectedTestCase] = useState(TEST_CASES[0].label);
  const [subTestItems, setSubTestItems] = useState([]);
  const [currentSubTestPage, setCurrentSubTestPage] = useState(1);

  useEffect(() => {
    console.log(selectedTestCase);

    if (selectedTestCase) {
      const parentTestCase = TEST_CASES.find(
        (item) => item.label === selectedTestCase
      );

      const items = parentTestCase.subtests.map((test) => {
        return {
          ...test,
          type:
            test.type === "checklist" ? (
              <testTypes.checklist label={test.label} />
            ) : (
              <testTypes.upload label={test.label} />
            ),
        };
      });

      setSubTestItems(items);
      setCurrentSubTestPage(1);
    }
  }, [selectedTestCase]);

  return (
    <PageWrapper>
      <PageHeader {...pageHeader} />
      <Container size="xl" mt="-50px">
        <Box p="md">
          <Paper withBorder p="md" radius="lg">
            <Stack>
              <Select
                label="Your favorite library"
                placeholder="Pick value or enter anything"
                value={selectedTestCase}
                onChange={(val) => setSelectedTestCase(val)}
                data={dropdownOptions}
                radius="md"
                w="50%"
              />
              <Text mt="md" c="dimmed">
                Please complete the form based on your screenshot.
              </Text>
              {subTestItems.length > 0
                ? subTestItems[currentSubTestPage - 1]?.type
                : null}
              <Group>
                <ActionIcon
                  onClick={() => setCurrentSubTestPage(currentSubTestPage - 1)}
                >
                  <IconChevronLeft />
                </ActionIcon>
                <ActionIcon
                  onClick={() => setCurrentSubTestPage(currentSubTestPage + 1)}
                >
                  <IconChevronRight />
                </ActionIcon>
              </Group>
            </Stack>
          </Paper>
        </Box>
      </Container>
    </PageWrapper>
  );
}
