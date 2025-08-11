import { Paper, Stack } from "@mantine/core";

import ProtectedPageWrapper from "../../components/wrappers/ProtectedPageWrapper";

const pageHeader = {
  title: "TA Portal Users List",
};

export default function UsersListPage() {
  return (
    <ProtectedPageWrapper header={pageHeader}>
      <Paper radius="lg">
        <Stack mb="xl"></Stack>
      </Paper>
    </ProtectedPageWrapper>
  );
}
