import { Container } from "@mantine/core";
import PageHeader from "../headers/PageHeader";
import Loading from "../loader/Loading";

import classes from "./Wrappers.module.css";
import { useCurrentUser } from "../../hooks/user/useCurrentUser";
import { tokenService } from "../../services/tokenService";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function ProtectedPageWrapper({ children, header, props }) {
  // const { isLoading: loading } = useCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [checkingAuth, setCheckingAuth] = useState(false); // set to true when backend is running

  useEffect(() => {
    const hasTokens =
      tokenService.getAccessToken() && tokenService.getRefreshToken();

    if (!hasTokens) {
      // navigate("/sign-in", { replace: true, state: { from: location } });
    } else {
      setCheckingAuth(false);
    }
  }, [navigate, location]);

  // if (checkingAuth || loading) {
  //   return <Loading loading={true} message={"Checking access..."} />;
  // }

  return (
    <Container fluid className={classes.pageWrapper} {...props}>
      <PageHeader {...header} />
      <Container size="xl" mt="-50px">
        {children}
      </Container>
    </Container>
  );
}
