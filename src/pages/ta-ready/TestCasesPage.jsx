import { Button, Container, Pill, Paper } from "@mantine/core";

import PageWrapper from "../../components/wrappers/PageWrapper";
import PageHeader from "../../components/headers/PageHeader";
import DefaultTable from "../../components/tables/DefaultTable";
import TableRowAction from "../../components/buttons/TableRowAction";
import AccordionLayout from "../../components/accordion/AccordionLayout";
import StatusChip from "../../components/chips/StatusChip";

import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { TEST_CASES } from "../../utils/staticTestData";

const pageHeader = {
  title: "Testing for F611C",
  subtitle:
    "RDTA-20250127-Huawei ONU WiFi 6 F611C for FTTX via Nokia OLT & ZTE BRAS",
};

const tableTitle = {
  title: "Huawei ONU F611C",
  subtitle: "Please select the test plan you wish to start.",
};

const tableHeaders = [
  { name: "Test case", withSort: false },
  { name: "Requisite", withSort: false },
  { name: "Status", withSort: false },
  { name: "", withSort: false },
];

const tableData = [
  {
    olt: "Nokia ISAM FX-4 (NOKIA-TLAB00)",
    bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
  },
  {
    olt: "ZTE C650 (NOKIA-TLAB00)",
    bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
  },
  {
    olt: "ZTE C320 (NOKIA-TLAB00)",
    bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
  },
  {
    olt: "Huawei MA5800-X2 (NOKIA-TLAB00)",
    bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
  },
  {
    olt: "Huawei MA5800-X2 (NOKIA-TLAB00)",
    bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
  },
];

export default function TestCasesPage({}) {
  const navigate = useNavigate();
  const redirect = (path) => {
    return navigate(path);
  };

  const getTableData = useCallback(
    (redirectPath, parentTestCase) => {
      let requisite = {};
      const parentTestCaseData = TEST_CASES.find(
        (data) => parentTestCase === data.label
      );

      if (parentTestCaseData.required) {
        const index = TEST_CASES.indexOf(parentTestCaseData);
        const testCase = TEST_CASES.slice(0, index)
          .reverse()
          .find((t) => t.required);

        requisite = testCase ? testCase : {};
      }

      const subtests = getTableItems(
        redirectPath,
        parentTestCaseData,
        requisite
      );

      return {
        subtitle: requisite.label ? `Pre-requisite: ${requisite.label}` : null,
        items: subtests,
        headers: tableHeaders,
        disableSearch: true,
      };
    },
    [tableData]
  );

  // table row data (subtests)
  const getTableItems = useCallback(
    (redirectPath, accordionItem, itemRequisite) => {
      const { subtests } = accordionItem;
      const isParentRequisiteIncomplete =
        itemRequisite.status && itemRequisite.status !== "complete";

      return subtests.map((subtest, index) => {
        let subtestRequisite = "None";
        let proceedBtnDisabled = false;

        if (isParentRequisiteIncomplete) {
          proceedBtnDisabled = true;
        } else if (subtest.required) {
          const unmetRequired = subtests
            .slice(0, index)
            .reverse()
            .find((s) => s.required && s.status !== "complete");

          if (unmetRequired) {
            subtestRequisite = unmetRequired.label;
            proceedBtnDisabled = true;
          }
        }

        return {
          label: subtest.label,
          requisite: subtestRequisite,
          status: subtest.status,
          action: (
            <TableRowAction disableView>
              <ProceedBtn
                disabled={proceedBtnDisabled}
                onClick={() => redirect(redirectPath)}
              />
            </TableRowAction>
          ),
        };
      });
    },
    []
  );

  const accordionItems = useMemo(() => {
    return TEST_CASES.map((item) => {
      return {
        ...item,
        description: `${item.subtests?.length} subtest cases`,
        panel: <DefaultTable {...getTableData(`/`, item.label)} />,
        pill: <StatusChip status={item.status} />,
      };
    });
  }, [tableData]);

  return (
    <PageWrapper header={pageHeader}>
      <Paper mx="md" radius="lg">
        <AccordionLayout items={accordionItems} />
      </Paper>
    </PageWrapper>
  );
}

function AccordionPill({ label }) {
  return (
    <Pill
      style={{
        backgroundColor: "var(--mantine-color-blue-5)",
        fontWeight: 700,
        color: "white",
      }}
    >
      {label.toUpperCase()}
    </Pill>
  );
}

function ProceedBtn({ onClick, disabled = false }) {
  return (
    <Button disabled={disabled} w={100} size="xs" radius="md" onClick={onClick}>
      Proceed
    </Button>
  );
}
