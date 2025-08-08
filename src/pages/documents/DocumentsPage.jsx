import {
  SimpleGrid,
  Stack,
  Menu,
  Button,
  FileInput,
  Group,
} from "@mantine/core";
import {
  IconEye,
  IconFileDownload,
  IconBan,
  IconCircleCheck,
} from "@tabler/icons-react";

import IconBtn from "../../components/buttons/IconBtn";
import AnalyticsCard from "../../components/cards/AnalyticsCard";
import DefaultTable from "../../components/tables/DefaultTable";
import ProtectedPageWrapper from "../../components/wrappers/ProtectedPageWrapper";
import TableRowAction from "../../components/buttons/TableRowAction";
import GenericBtn from "../../components/buttons/GenericBtn";
import ModalBtn from "../../components/buttons/ModalBtn";

import { useMemo } from "react";
import { DOCUMENT_HEADERS, DOCUMENT_ANALYTICS } from "../../utils/headers";

const pageHeader = {
  title: "TA Documentations",
  subtitle: "Document request, provision, and approval",
};

const tableData = [
  {
    id: "352BT2OI3",
    model: "F611A",
    service: "FTTX",
    olt: "ZTE C320 (NOKIA-TLAB00)",
    bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
    status: "pending",
  },
  {
    id: "GAER6G7AR",
    model: "F611B",
    service: "FAST",
    olt: "Huawei MA5800-X2 (NOKIA-TLAB00)",
    bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
    status: "pending",
  },
  {
    id: "7GA9RGG8R",
    model: "F611C",
    service: "FTTX",
    olt: "Huawei MA5800-X2 (NOKIA-TLAB00)",
    bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
    status: "forApproval",
  },
  {
    id: "GAE7GEHR8",
    model: "F611D",
    service: "Cielo",
    olt: "Huawei MA5800-X2 (NOKIA-TLAB00)",
    bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
    status: "approved",
  },
  {
    id: "KH0WE7GEE",
    model: "F611E",
    service: "FAST",
    olt: "ZTE C320 (NOKIA-TLAB00)",
    bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
    status: "forApproval",
  },
  {
    id: "32Y5T2OI3",
    model: "F611F",
    service: "FTTX",
    olt: "Nokia ISAM FX-4 (NOKIA-TLAB00)",
    bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
    status: "forApproval",
  },
  {
    id: "GJRC6G7AR",
    model: "F611G",
    service: "IBIZ",
    olt: "ZTE C320 (NOKIA-TLAB00)",
    bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
    status: "provided",
  },
  {
    id: "7J25RGG8R",
    model: "F611H",
    service: "IBIZ",
    olt: "Nokia ISAM FX-4 (NOKIA-TLAB00)",
    bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
    status: "provided",
  },
  {
    id: "GHR4GEHR8",
    model: "F611I",
    service: "FAST",
    olt: "ZTE C650 (NOKIA-TLAB00)",
    bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
    status: "approved",
  },
  {
    id: "KA0W24GEE",
    model: "F611J",
    service: "Cielo",
    olt: "Nokia ISAM FX-4 (NOKIA-TLAB00)",
    bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
    status: "pending",
  },
  {
    id: "4HR4GEHR8",
    model: "F611K",
    service: "FTTX",
    olt: "Huawei MA5800-X2 (NOKIA-TLAB00)",
    bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
    status: "pending",
  },
  {
    id: "HE0W24GEE",
    model: "F611L",
    service: "Cielo",
    olt: "ZTE C650 (NOKIA-TLAB00)",
    bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
    status: "pending",
  },
];

export default function DocumentsPage({}) {
  // returns the actions (buttons) of a row based on status field.
  const getActions = (status) => {
    const actions = {
      pending: <PendingBtn />,
      provided: <ReModalBtn />,
      forApproval: <ForApprovalBtn />,
      approved: <GenericBtn label="Download" onClick={() => {}} />,
    };

    return (
      <TableRowAction disableView>
        {actions[status]}
        <IconBtn
          tooltip="View test results"
          icon={IconEye}
          onClick={() => {}}
        />
      </TableRowAction>
    );
  };

  const tableItems = useMemo(() => {
    return tableData.map((data) => {
      const { model, service, olt, bras, status } = data;
      return {
        model,
        service,
        olt,
        bras,
        status,
        action: getActions(data.status),
      };
    });
  }, [tableData]);

  return (
    <ProtectedPageWrapper header={pageHeader}>
      <Stack>
        <div>
          <SimpleGrid cols={{ base: 2, xs: 2, md: 4 }}>
            {DOCUMENT_ANALYTICS.map((item) => (
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
            headers={DOCUMENT_HEADERS}
            layout="fixed"
          />
        </div>
      </Stack>
    </ProtectedPageWrapper>
  );
}

function ForApprovalBtn({}) {
  return (
    <>
      <Menu shadow="md" w={95}>
        <Menu.Target>
          <Button size="xs" radius="lg">
            More
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item leftSection={<IconFileDownload size={14} />}>
            Download file
          </Menu.Item>
          <Menu.Item leftSection={<IconCircleCheck size={14} />}>
            Approve
          </Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<IconBan size={14} />}
            onClick={() => {}}
          >
            Reject
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}

function PendingBtn({}) {
  return (
    <>
      <ModalBtn
        props={{ w: 95 }}
        btnLabel="Upload"
        title="Upload a PDF file of the documentation"
      >
        <Group align="end" gap="xs">
          <FileInput flex={1} placeholder="Choose a file" />
          <Button>Upload</Button>
        </Group>
      </ModalBtn>
    </>
  );
}

function ReModalBtn({}) {
  return (
    <>
      <ModalBtn
        props={{ w: 95 }}
        btnLabel="Re-upload"
        title="Re-upload a PDF file of the documentation"
      >
        <Group align="end" gap="xs">
          <FileInput flex={1} placeholder="Choose a file" />
          <Button>Upload</Button>
        </Group>
      </ModalBtn>
    </>
  );
}
