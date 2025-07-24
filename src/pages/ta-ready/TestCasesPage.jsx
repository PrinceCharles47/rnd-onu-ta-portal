import { Button, Paper } from "@mantine/core";

import PageWrapper from "../../components/wrappers/PageWrapper";
import DefaultTable from "../../components/tables/DefaultTable";
import AccordionLayout from "../../components/accordion/AccordionLayout";
import StatusChip from "../../components/chips/StatusChip";

import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import { TEST_CASES } from "../../utils/staticTestData";
import {
  findTestRequisite,
  withCompleteStatus,
} from "../../utils/testCaseHelpers";

const pageHeader = {
  title: "Testing for F611C",
  subtitle:
    "RDTA-20250127-Huawei ONU WiFi 6 F611C for FTTX via Nokia OLT & ZTE BRAS",
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
      if (parentTestCase.required) {
        requisite = findTestRequisite(TEST_CASES, parentTestCase);
      }

      const subtests = getTableItems(
        redirectPath,
        parentTestCase.subtests,
        requisite
      );

      return {
        subtitle: requisite?.label && `Pre-requisite: ${requisite.label}`,
        items: subtests,
        headers: tableHeaders,
        disableSearch: true,
        props: { withBorder: false },
      };
    },
    [tableData]
  );

  // table row data (subtests)
  const getTableItems = useCallback((redirectPath, subtests, itemRequisite) => {
    // for the requisite of the first parent test case, it is empty
    const isParentRequisiteIncomplete =
      itemRequisite && !withCompleteStatus(itemRequisite.status);

    return subtests.map((subtest) => {
      let subtestRequisite = "None";
      let proceedBtnDisabled = false;

      if (isParentRequisiteIncomplete) {
        proceedBtnDisabled = true;
      } else if (subtest.required) {
        const unmetRequired = findTestRequisite(subtests, subtest);
        subtestRequisite = unmetRequired?.label || "None";
        proceedBtnDisabled = !withCompleteStatus(unmetRequired?.status);
      }

      return {
        label: subtest.label,
        requisite: subtestRequisite,
        status: subtest.status,
        action: (
          <ProceedBtn
            disabled={proceedBtnDisabled}
            onClick={() => redirect(redirectPath)}
          />
        ),
      };
    });
  }, []);

  const accordionItems = useMemo(() => {
    return TEST_CASES.map((item) => {
      return {
        ...item,
        description: `${item.subtests?.length} subtest cases`,
        panel: <DefaultTable {...getTableData(`/`, item)} />,
        pill: <StatusChip status={item.status} />,
      };
    });
  }, [tableData]);

  return (
    <PageWrapper header={pageHeader}>
      <Paper radius="lg">
        <AccordionLayout items={accordionItems} />
      </Paper>
    </PageWrapper>
  );
}

function ProceedBtn({ onClick, disabled = false }) {
  return (
    <Button disabled={disabled} w={100} size="xs" radius="md" onClick={onClick}>
      Proceed
    </Button>
  );
}
