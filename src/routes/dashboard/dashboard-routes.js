import DashboardLayout from "../../pages/dashboard/DashboardLayout";
import DashboardPage from "../../pages/dashboard/DashboardPage";
import ServicesPage from "../../pages/ta-ready/ServicesPage";
import TestCasesPage from "../../pages/ta-ready/TestCasesPage";
import IOFRequestPage from "../../pages/iof-request/IOFRequestPage";

export const dashboardRoutes = {
  path: "/",
  children: [
    {
      Component: DashboardLayout,
      children: [
        {
          index: true,
          Component: DashboardPage,
        },
        {
          path: "data-plan/:id",
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
      ],
    },
  ],
};
