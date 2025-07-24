import { Button, Paper, keys, Text } from "@mantine/core";

import PageWrapper from "../../components/wrappers/PageWrapper";
import DefaultTable from "../../components/tables/DefaultTable";
import TableRowAction from "../../components/buttons/TableRowAction";
import AccordionLayout from "../../components/accordion/AccordionLayout";
import StatusChip from "../../components/chips/StatusChip";
import GenericBtn from "../../components/buttons/GenericBtn";

import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { OLT_HEADERS } from "../../utils/headers";
import { SERVICES } from "../../utils/staticTestData";

const pageHeader = {
  title: "Testing for F611C (WiFi 6)",
};

const tableTitle = {
  title: "Huawei ONU F611C",
  subtitle: "Click on each OLT to view the list of test cases.",
};

export default function ServicesPage({}) {
  const navigate = useNavigate();
  const { id: onuId } = useParams();

  const redirect = (path) => {
    return navigate(path);
  };

  const getTableItems = useCallback(
    (service, redirectPath) => {
      const serviceData = SERVICES[service.toLowerCase()];
      if (!serviceData) return [];
      return serviceData.olt.map((data) => {
        return {
          ...data,
          action: (
            <TableRowAction
              onView={() => redirect(`${redirectPath}/${data.olt}`)}
            />
          ),
        };
      });
    },
    [SERVICES]
  );

  const accordionItems = useMemo(() => {
    return keys(SERVICES).map((key) => {
      const { service, description, status } = SERVICES[key];
      return {
        label: service,
        description,
        status,
        panel: (
          <ServicePanel
            items={getTableItems(SERVICES[key].service, `/${onuId}/${service}`)}
            action={
              <GenericBtn
                label="Go to docs"
                onClick={() => redirect(`/${service}/${onuId}`)}
              />
            }
          />
        ),
        pill: <StatusChip status={status} />,
      };
    });
  }, [SERVICES]);

  return (
    <PageWrapper header={pageHeader}>
      <Paper radius="lg">
        <AccordionLayout items={accordionItems} />
      </Paper>
    </PageWrapper>
  );
}

function ServicePanel({ items, action }) {
  return (
    <DefaultTable
      items={items}
      subtitle={tableTitle.subtitle}
      headers={OLT_HEADERS}
      disableSearch
      props={{ withBorder: false }}
      action={action}
    />
  );
}
