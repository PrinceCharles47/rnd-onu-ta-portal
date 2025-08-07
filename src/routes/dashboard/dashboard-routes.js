import DashboardLayout from "../../pages/dashboard/DashboardLayout";
import DashboardPage from "../../pages/dashboard/DashboardPage";
import ServicesPage from "../../pages/ta-ready/ServicesPage";
import TestCasesPage from "../../pages/ta-ready/TestCasesPage";
import IOFRequestPage from "../../pages/iof-request/IOFRequestPage";
import DocumentProcessPage from "../../pages/documents/DocumentProcessPage";

// loader functions
import { requireAuth } from "../../utils/auth";

export const dashboardRoutes = {
  path: "/",
  children: [
    {
      loader: requireAuth,
      Component: DashboardLayout,
      children: [
        {
          index: true,
          Component: DashboardPage,
        },
        {
          path: "services/:id",
          Component: ServicesPage,
        },
        {
          path: ":id/:service/:olt",
          Component: TestCasesPage,
        },
        {
          path: "pending-iof/:id",
          Component: IOFRequestPage,
        },
        {
          path: "documents/:service",
          Component: DocumentProcessPage,
        },
      ],
    },
  ],
};
