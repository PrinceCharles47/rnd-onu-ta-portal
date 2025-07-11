// react-router
import { Outlet } from "react-router";

import NavLayout from "../components/navigation/NavLayout";

export default function RootLayout({}) {
  return (
    <NavLayout>
      <Outlet />
    </NavLayout>
  );
}
