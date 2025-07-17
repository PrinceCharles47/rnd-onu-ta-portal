import {
  SimpleGrid,
  Container,
  Stack,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import AddONUDialog from "../../components/dialogs/AddONUDialog";
import PageHeader from "../../components/headers/PageHeader";
import AnalyticsCard from "../../components/cards/AnalyticsCard";
import DefaultTable from "../../components/tables/DefaultTable";
import PageWrapper from "../../components/wrappers/PageWrapper";
import TableRowAction from "../../components/buttons/TableRowAction";

import { useMemo } from "react";
import { useNavigate } from "react-router";
import { DASHBOARD_HEADERS, ANALYTICS_CARD_HEADERS } from "../../utils/headers";

const pageHeader = {
  title: "Hello Charles!",
  subtitle: "Welcome to R&D TA Portal",
};

const tableData = [
  {
    id: "352BT2OI3",
    model: "F611A",
    status: "Pending IOF",
    assignee: "Noah",
  },
  {
    id: "GAER6G7AR",
    model: "F611B",
    status: "Ongoing TA",
    assignee: "Prince",
  },
  {
    id: "7GA9RGG8R",
    model: "F611C",
    status: "Ready for TA",
    assignee: "Charles",
  },
  {
    id: "GAE7GEHR8",
    model: "F611D",
    status: "Ready for TA",
    assignee: "Tim",
  },
  {
    id: "KH0WE7GEE",
    model: "F611E",
    status: "Completed",
    assignee: "Rocher",
  },
  {
    id: "32Y5T2OI3",
    model: "F611F",
    status: "Pending IOF",
    assignee: "Noah",
  },
  {
    id: "GJRC6G7AR",
    model: "F611G",
    status: "Ready for TA",
    assignee: "Prince",
  },
  {
    id: "7J25RGG8R",
    model: "F611H",
    status: "Ready for TA",
    assignee: "Charles",
  },
  {
    id: "GHR4GEHR8",
    model: "F611I",
    status: "Ready for TA",
    assignee: "Tim",
  },
  {
    id: "KA0W24GEE",
    model: "F611J",
    status: "Completed",
    assignee: "Rocher",
  },
  {
    id: "4HR4GEHR8",
    model: "F611K",
    status: "Ready for TA",
    assignee: "Tim",
  },
  {
    id: "HE0W24GEE",
    model: "F611L",
    status: "Completed",
    assignee: "Rocher",
  },
];

export default function OngoingTAPage({}) {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const redirect = (path) => {
    return navigate(path);
  };

  // returns the actions (buttons) of a row based on status field.
  const getActions = (status, onuId = "") => {
    const actions = {
      "Pending IOF": <TableRowAction />,
      "Ready for TA": (
        <TableRowAction>
          <StartONUTestBtn onClick={() => redirect(`/data-plan/${onuId}`)} />
        </TableRowAction>
      ),
      "Ongoing TA": <TableRowAction />,
      Completed: <TableRowAction />,
    };

    return actions[status];
  };

  const tableItems = useMemo(() => {
    return tableData.map((data) => {
      return {
        model: data.model,
        status: data.status,
        assignee: data.assignee,
        action: getActions(data.status, data.id),
      };
    });
  }, [tableData]);

  return (
    <PageWrapper>
      <PageHeader {...pageHeader} />
      <Container size="xl" mt="-50px">
        <Stack px="md">
          <div>
            <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>
              {ANALYTICS_CARD_HEADERS.map((item) => (
                <AnalyticsCard
                  key={item.title}
                  title={item.title}
                  value={item.value}
                  icon={item.icon}
                />
              ))}
            </SimpleGrid>
          </div>
          <div>
            <DefaultTable
              items={tableItems}
              headers={DASHBOARD_HEADERS}
              title={"Huawei ONUs"}
              action={<TableAction action={open} />}
            />
          </div>
        </Stack>

        <AddONUDialog opened={opened} onClose={close} />
      </Container>
    </PageWrapper>
  );
}

function TableAction({ action }) {
  return (
    <Button radius="md" onClick={action}>
      Add ONU
    </Button>
  );
}

function StartONUTestBtn({ onClick = () => {} }) {
  return (
    <Button w={125} size="xs" radius="md" color="green" onClick={onClick}>
      Start Test
    </Button>
  );
}
