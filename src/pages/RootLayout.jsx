import { Box } from "@mantine/core";

// react-router
import { Outlet } from "react-router";

import NavLayout from "../components/navigation/NavLayout";

export default function RootLayout({}) {
  return (
    <Box pos="relative" style={{ minHeight: "100vh" }}>
      <NavLayout>
        <Outlet />
      </NavLayout>
    </Box>
  );
}
