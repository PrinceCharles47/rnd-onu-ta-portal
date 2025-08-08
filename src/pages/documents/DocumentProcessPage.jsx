import { Paper, Button, FileInput, Group } from "@mantine/core";
import { IconFileDownload } from "@tabler/icons-react";

import ProtectedPageWrapper from "../../components/wrappers/ProtectedPageWrapper";
import DefaultTable from "../../components/tables/DefaultTable";
import GenericBtn from "../../components/buttons/GenericBtn";
import ModalBtn from "../../components/buttons/ModalBtn";
import IconBtn from "../../components/buttons/IconBtn";
import TableRowAction from "../../components/buttons/TableRowAction";

import { SERVICES } from "../../utils/staticTestData";
import { OLT_DOCS_HEADERS } from "../../utils/headers";

const pageHeader = {
  title: "Test Documents for F611C",
  subtitle: "RDTA-20250127-Huawei ONU WiFi 6 F611C for FTTX",
};

const tableRawData = SERVICES.fast.olt;

const rowActions = {
  unavailable: null,
  forRequest: (
    <GenericBtn label="Request" onClick={() => {}} props={{ w: 115 }} />
  ),
  pendingRequest: null,
  available: <RouteForApprovalBtn />,
  forApproval: (
    <GenericBtn label="Download" onClick={() => {}} props={{ w: 115 }} />
  ),
};

const tableRows = tableRawData.map((item) => {
  const { olt, bras, document } = item;
  return {
    olt,
    bras,
    status: document.status,
    action: (
      <TableRowAction disableView>{rowActions[document.status]}</TableRowAction>
    ),
  };
});

export default function DocumentProcessPage({}) {
  return (
    <ProtectedPageWrapper header={pageHeader}>
      <Paper radius="lg">
        <DefaultTable
          items={tableRows}
          headers={OLT_DOCS_HEADERS}
          disableSearch
        />
      </Paper>
    </ProtectedPageWrapper>
  );
}

function RouteForApprovalBtn({}) {
  return (
    <>
      <ModalBtn
        btnLabel="Upload"
        title="Upload a PDF file of the documentation"
      >
        <Group align="end" gap="xs">
          <FileInput flex={1} placeholder="Choose a file" />
          <Button>Upload</Button>
        </Group>
      </ModalBtn>
      <IconBtn
        tooltip="Download document"
        icon={IconFileDownload}
        onClick={() => {}}
      />
    </>
  );
}
