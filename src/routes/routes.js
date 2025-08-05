import { createBrowserRouter } from "react-router";
import RootLayout from "../pages/RootLayout";
import { dashboardRoutes } from "./dashboard/dashboard-routes";
import { userRoutes } from "./user/user-routes";
import { topologyRoutes } from "./topology/topology-routes";
import { tshootToolRoutes } from "./tshoot-tool/tshoot-tool-routes";
import { documentsRoutes } from "./documents/documents-routes";

// unprotected routes
import { authRoutes } from "./auth/auth-routes";

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      dashboardRoutes,
      userRoutes,
      topologyRoutes,
      tshootToolRoutes,
      documentsRoutes,
    ],
  },
  ...authRoutes,
]);
