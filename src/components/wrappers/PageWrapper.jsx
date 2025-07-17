import { Container } from "@mantine/core";
import classes from "./Wrappers.module.css";

export default function PageWrapper({ children, props }) {
  return (
    <Container className={classes.pageWrapper} {...props}>
      {children}
    </Container>
  );
}
