import { Container } from "@mantine/core";
import PageHeader from "../headers/PageHeader";
import classes from "./Wrappers.module.css";

export default function PageWrapper({ children, header, props }) {
  return (
    <Container className={classes.pageWrapper} {...props}>
      <PageHeader {...header} />
      <Container size="xl" mt="-50px">
        {children}
      </Container>
    </Container>
  );
}
