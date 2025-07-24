import { Paper } from "@mantine/core";
import { IconFileDownload } from "@tabler/icons-react";

import PageWrapper from "../../components/wrappers/PageWrapper";
import DefaultTable from "../../components/tables/DefaultTable";
import GenericBtn from "../../components/buttons/GenericBtn";
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
  available: (
    <>
      <GenericBtn label="Upload" onClick={() => {}} />
      <IconBtn
        tooltip="Download document"
        icon={IconFileDownload}
        onClick={() => {}}
      />
    </>
  ),
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

export default function TestDocumentsPage({}) {
  return (
    <PageWrapper header={pageHeader}>
      <Paper radius="lg">
        <DefaultTable
          items={tableRows}
          headers={OLT_DOCS_HEADERS}
          disableSearch
        />
      </Paper>
    </PageWrapper>
  );
}
