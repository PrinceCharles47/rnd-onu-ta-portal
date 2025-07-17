import { Button, Container, Pill, Paper } from "@mantine/core";

import PageWrapper from "../../components/wrappers/PageWrapper";
import PageHeader from "../../components/headers/PageHeader";
import DefaultTable from "../../components/tables/DefaultTable";
import TableRowAction from "../../components/buttons/TableRowAction";
import AccordionLayout from "../../components/accordion/AccordionLayout";

import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { OLT_HEADERS, SERVICES_HEADERS } from "../../utils/headers";

const pageHeader = {
  title: "Testing for F611C (WiFi 6)",
};

const tableTitle = {
  title: "Huawei ONU F611C",
  subtitle: "Please select the test plan you wish to start.",
};

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

export default function ServiceTestPage({}) {
  const navigate = useNavigate();
  const { id: onuId } = useParams();

  const redirect = (path) => {
    return navigate(path);
  };

  const getTableItems = useCallback(
    (redirectPath) => {
      return tableData.map((data) => {
        return {
          ...data,
          action: (
            <TableRowAction disableView>
              <ViewBtn onClick={() => redirect(redirectPath)} />
            </TableRowAction>
          ),
        };
      });
    },
    [tableData]
  );

  const accordionItems = useMemo(() => {
    return SERVICES_HEADERS.map((item) => {
      return {
        ...item,
        panel: (
          <DefaultTable
            items={getTableItems(`/${onuId}/${item.label}/olt`)}
            headers={OLT_HEADERS}
            title={tableTitle.title}
            subtitle={tableTitle.subtitle}
            disableSearch
          />
        ),
        pill: <AccordionPill label={item.status} />,
      };
    });
  }, [tableData]);

  return (
    <PageWrapper>
      <PageHeader {...pageHeader} />
      <Container size="xl" mt="-50px">
        <Paper mx="md" radius="lg">
          <AccordionLayout items={accordionItems} />
        </Paper>
      </Container>
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

function ViewBtn({ onClick }) {
  return (
    <Button w={75} size="xs" radius="md" onClick={onClick}>
      View
    </Button>
  );
}
