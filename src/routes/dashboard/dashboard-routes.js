import DashboardLayout from "../../pages/dashboard/DashboardLayout";
import OngoingTAPage from "../../pages/dashboard/OngoingTAPage";
import CompletedTAPage from "../../pages/dashboard/CompletedTAPage";
import ServiceTestPage from "../../pages/dashboard/ServiceTestPage";
import TestCasePage from "../../pages/test-case/TestCasePage";

export const dashboardRoutes = {
  path: "/",
  children: [
    {
      Component: DashboardLayout,
      children: [
        {
          index: true,
          Component: OngoingTAPage,
        },
        {
          path: "completed-ta",
          Component: CompletedTAPage,
        },
        {
          path: "data-plan/:id",
          Component: ServiceTestPage,
        },
        {
          path: ":id/:service/olt",
          Component: TestCasePage,
        },
      ],
    },
  ],
};
