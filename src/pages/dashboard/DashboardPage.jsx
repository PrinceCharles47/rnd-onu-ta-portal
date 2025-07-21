import { SimpleGrid, Container, Stack, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import NewONUForm from "../../components/forms/NewONUForm";
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
    status: "pendingIOF",
    assignee: "Noah",
  },
  {
    id: "GAER6G7AR",
    model: "F611B",
    status: "ongoingTA",
    assignee: "Prince",
  },
  {
    id: "7GA9RGG8R",
    model: "F611C",
    status: "readyForTA",
    assignee: "Charles",
  },
  {
    id: "GAE7GEHR8",
    model: "F611D",
    status: "readyForTA",
    assignee: "Tim",
  },
  {
    id: "KH0WE7GEE",
    model: "F611E",
    status: "complete",
    assignee: "Rocher",
  },
  {
    id: "32Y5T2OI3",
    model: "F611F",
    status: "pendingIOF",
    assignee: "Noah",
  },
  {
    id: "GJRC6G7AR",
    model: "F611G",
    status: "readyForTA",
    assignee: "Prince",
  },
  {
    id: "7J25RGG8R",
    model: "F611H",
    status: "readyForTA",
    assignee: "Charles",
  },
  {
    id: "GHR4GEHR8",
    model: "F611I",
    status: "readyForTA",
    assignee: "Tim",
  },
  {
    id: "KA0W24GEE",
    model: "F611J",
    status: "complete",
    assignee: "Rocher",
  },
  {
    id: "4HR4GEHR8",
    model: "F611K",
    status: "readyForTA",
    assignee: "Tim",
  },
  {
    id: "HE0W24GEE",
    model: "F611L",
    status: "complete",
    assignee: "Rocher",
  },
];

export default function DashboardPage({}) {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const user = { role: "rnd" };

  const redirect = (path) => {
    return navigate(path);
  };

  // returns the actions (buttons) of a row based on status field.
  const getActions = (status, onuId = "") => {
    const userAction = {
      rnd: (
        <TableRowAction>
          <ViewIOFRequest onClick={() => redirect(`/pending-iof/${onuId}`)} />
        </TableRowAction>
      ),
      vendor: (
        <TableRowAction>
          <StartONUTestBtn onClick={() => redirect(`/data-plan/${onuId}`)} />
        </TableRowAction>
      ),
    };
    const actions = {
      pendingIOF:
        user.role === "rnd" ? userAction[user.role] : <TableRowAction />,
      readyForTA:
        user.role === "vendor" ? userAction[user.role] : <TableRowAction />,
      ongoingTA: <TableRowAction />,
      completed: <TableRowAction />,
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
    <PageWrapper header={pageHeader}>
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

      <NewONUForm opened={opened} onClose={close} />
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
    <Button w={125} size="xs" radius="md" onClick={onClick}>
      Start Test
    </Button>
  );
}

function ViewIOFRequest({ onClick = () => {} }) {
  return (
    <Button w={125} size="xs" radius="md" onClick={onClick}>
      View Request
    </Button>
  );
}
