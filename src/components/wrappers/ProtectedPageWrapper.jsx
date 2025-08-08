import { Container } from "@mantine/core";
import PageHeader from "../headers/PageHeader";
import classes from "./Wrappers.module.css";
import { useUser } from "../../hooks/user/useUser";

export default function ProtectedPageWrapper({
  children,
  header,
  props,
  isProtectedRoute = true,
}) {
  const { getLoggedInUser } = useUser();

  if (isProtectedRoute && getLoggedInUser.isLoading) {
    return <>{getLoggedInUser.isLoading ?? "Loading..."}</>;
  }

  if (isProtectedRoute && getLoggedInUser.isError) {
    return <>With error: {getLoggedInUser.isError}</>;
  }

  return (
    <Container fluid className={classes.pageWrapper} {...props}>
      <PageHeader {...header} />
      <Container size="xl" mt="-50px">
        {children}
      </Container>
    </Container>
  );
}
