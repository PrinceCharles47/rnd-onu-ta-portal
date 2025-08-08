import {
  Paper,
  Checkbox,
  Table,
  ScrollArea,
  Group,
  Text,
  Stack,
} from "@mantine/core";

import { IconPlus } from "@tabler/icons-react";

import ProtectedPageWrapper from "../../components/wrappers/ProtectedPageWrapper";
import TestSelectionTable from "../../components/tables/TestSelectionTable";
import GenericBtn from "../../components/buttons/GenericBtn";
import ModalBtn from "../../components/buttons/ModalBtn";
import IconBtn from "../../components/buttons/IconBtn";
// import { TEST_CASES } from "../../utils/staticTestData";
import TEST_CASES from "../../utils/mockup-data/testing/olt-test-cases.json";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

const pageHeader = {
  title: "IOF request for F611C (WiFi 6)",
};

export default function IOFRequestPage() {
  const [selectedTestCases, setSelectedTestCases] = useState([]);
  const [selectedSubtests, setSelectedSubtests] = useState([]);

  const handleSetSelectedSubtests = (subtestId, parentTest) => {
    setSelectedSubtests((prev) => {
      const isSelected = prev.find((item) => item.id === subtestId);

      return isSelected
        ? prev.filter((item) => item.id !== subtestId)
        : [
            ...prev,
            {
              parentTest: { id: parentTest.id, label: parentTest.label },
              ...parentTest.subtests.find((item) => item.id === subtestId),
            },
          ];
    });
  };

  const checkRequisiteInclusion = (testCase) => {
    setSelectedTestCases((prev) => {
      return prev.includes(testCase.id)
        ? removeRequisiteOnUnselect(testCase, selectedTestCases)
        : [...prev, testCase.id];
    });
  };

  const removeRequisiteOnUnselect = (testCase, selectedCases) => {
    // if the test case is not on the selectedCases, return selectedCases
    if (!selectedCases.includes(testCase.id)) return selectedCases;
    let filteredCases = selectedCases.filter((item) => item !== testCase.id);

    // look for the test case from all unfiltered test cases whose requisite is the current clicked test case.
    // returns undefined if a test case has no requisite.
    const nextCase = TEST_CASES.testCases.find((item) => {
      if (item.requisite && item.requisite.id === testCase.id) {
        return item;
      }
    });

    return nextCase
      ? removeRequisiteOnUnselect(nextCase, filteredCases)
      : filteredCases;
  };

  const tableRows = TEST_CASES.testCases.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Group>
          <Checkbox
            checked={selectedTestCases.includes(item.id)}
            disabled={
              item.requisite
                ? selectedTestCases.includes(item.requisite.id)
                  ? false
                  : true
                : false
            }
            onChange={() => checkRequisiteInclusion(item)}
          />
          <div>
            <Text>{item.label}</Text>
            <Text fz="xs" c="dimmed">
              {`Pre-requisite: ${
                item.requisite ? item.requisite.label : "None"
              }`}
            </Text>
          </div>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  const displayedSelectedCases = selectedTestCases.map((testCaseId) => {
    const testCase = TEST_CASES.testCases.find((item) => {
      if (item.id === testCaseId) {
        return item.id;
      }
    });

    return (
      <TestCaseDetails
        key={testCaseId}
        testCase={testCase}
        subtests={selectedSubtests}
        onSelect={handleSetSelectedSubtests}
      />
    );
  });

  return (
    <ProtectedPageWrapper header={pageHeader}>
      <Paper radius="lg">
        <Group mb="md" justify="end">
          <ModalBtn
            title="Select the test cases you would like to add."
            btnLabel="Add test case"
            defaultOpen
          >
            <ScrollArea h={400}>
              <Table verticalSpacing="md">
                <Table.Tbody>{tableRows}</Table.Tbody>
              </Table>
            </ScrollArea>
          </ModalBtn>
        </Group>
        <Stack gap="xl">{displayedSelectedCases}</Stack>
      </Paper>
    </ProtectedPageWrapper>
  );
}

function TestCaseDetails({ testCase, subtests, onSelect }) {
  const tableItems = subtests.filter(
    (item) => item.parentTest.id === testCase.id
  );

  const modalTableRows = testCase.subtests.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Group>
          <Checkbox
            checked={subtests.find((subtest) => item.id === subtest.id)}
            onChange={() => onSelect(item.id, testCase)}
          />
          <div>
            <Text>{item.label}</Text>
            <Text fz="xs" c="dimmed">
              {`Pre-requisite: ${
                item.requisite ? item.requisite.label : "None"
              }`}
            </Text>
          </div>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper radius="lg">
      <Group align="center" justify="space-between">
        <div>
          <Text fw={500}>{testCase.label}</Text>
          <Text fz="xs" c="dimmed">{`Pre-requisite: ${
            testCase.requisite ? testCase.requisite.label : "None"
          }`}</Text>
        </div>

        <ModalBtn
          title="Select the subtest cases you would like to add."
          btnLabel="Add subtest"
        >
          <ScrollArea h={400}>
            <Table verticalSpacing="md">
              <Table.Tbody>{modalTableRows}</Table.Tbody>
            </Table>
          </ScrollArea>
        </ModalBtn>
        {/* <IconBtn
          icon={IconPlus}
          tooltip="Add a subtest"
          onClick={() => {}}
          props={{ variant: "filled", radius: "md", size: "lg" }}
        /> */}
      </Group>
      <Paper mt="md" radius="lg">
        <TestSelectionTable
          subtests={tableItems}
          // onSelect={(subtestId) => onSelect(subtestId, testCase)}
        />
      </Paper>
    </Paper>
  );
}
