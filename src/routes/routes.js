import { createBrowserRouter } from "react-router";
import RootLayout from "../pages/RootLayout";
import { dashboardRoutes } from "./dashboard/dashboard-routes";
import { userRoutes } from "./user/user-routes";
import { topologyRoutes } from "./topology/topology-routes";
import { tshootToolRoutes } from "./tshoot-tool/tshoot-tool-routes";

// unprotected routes

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [dashboardRoutes, userRoutes, topologyRoutes, tshootToolRoutes],
  },
  // {
  //   path: "/sign-in",
  //   Component: SignInPage,
  // },
]);
