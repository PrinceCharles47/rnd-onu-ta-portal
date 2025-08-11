import { Container } from "@mantine/core";
import PageHeader from "../headers/PageHeader";
import Loading from "../loader/Loading";

import classes from "./Wrappers.module.css";
import { useUser } from "../../hooks/user/useUser";

export default function ProtectedPageWrapper({ children, header, props }) {
  const { isLoading } = useUser();

  return (
    <Container fluid className={classes.pageWrapper} {...props}>
      {isLoading && (
        <Loading loading={isLoading} message={"Loading data, please wait."} />
      )}

      <PageHeader {...header} />
      <Container size="xl" mt="-50px">
        {children}
      </Container>
    </Container>
  );
}
