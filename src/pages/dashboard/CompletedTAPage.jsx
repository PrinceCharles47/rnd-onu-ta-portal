import { Container, Box } from "@mantine/core";
import ONUWANStatusForm from "../../components/forms/ONUWANStatusForm";
import PageHeader from "../../components/headers/PageHeader";
import PageWrapper from "../../components/wrappers/PageWrapper";

const header = {
  title: "ONU WAN Status",
  subtitle:
    "RDTA-20250127-Huawei ONU WiFi 6 F611C for FTTX via Nokia OLT & ZTE BRAS",
};

export default function CompletedTAPage() {
  return (
    <PageWrapper>
      <PageHeader title={header.title} subtitle={header.subtitle} />
      <Container size="xl" mt="-50px">
        <Box px="md">
          <ONUWANStatusForm />
        </Box>
      </Container>
    </PageWrapper>
  );
}
