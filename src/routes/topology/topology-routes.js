import TopologyLayout from "../../pages/topology/TopologyLayout";
import ServicesPage from "../../pages/topology/ServicesPage";
import TestPlanPage from "../../pages/topology/TestPlanPage";

export const topologyRoutes = {
  path: "/topology",
  children: [
    {
      Component: TopologyLayout,
      children: [
        {
          path: "services",
          Component: ServicesPage,
        },
        {
          path: "test-plan",
          Component: TestPlanPage,
        },
      ],
    },
  ],
};
