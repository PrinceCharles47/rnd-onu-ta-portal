import DashboardLayout from "../../pages/dashboard/DashboardLayout";
import OngoingTAPage from "../../pages/dashboard/OngoingTAPage";
import CompletedTAPage from "../../pages/dashboard/CompletedTAPage";

export const dashboardRoutes = {
  path: "/dashboard",
  children: [
    {
      Component: DashboardLayout,
      children: [
        {
          path: "ongoing-ta",
          Component: OngoingTAPage,
        },
        {
          path: "completed-ta",
          Component: CompletedTAPage,
        },
      ],
    },
  ],
};
