import {
  IconRouter,
  IconListDetails,
  IconLoader3,
  IconListCheck,
} from "@tabler/icons-react";

export const dashBoardPageConfig = {
  headers: {
    page: {
      title: "Hello Charles!",
      subtitle: "Welcome to R&D TA Portal",
    },
    table: ["Name", "Model", "WiFi Type", "ONT Type", "Status"],
  },
  pageItemsLimit: 10, // 10 by default. can be used in the pageSize param of getUsers endpoint to display more users per page of table
  status: {
    pending_iof: "pendingIOF",
    ready_for_ta: "readyForTA",
    ongoing_ta: "ongoingTA",
    type_approved: "typeApproved",
  },
  wifiType: {
    wifi6: "WiFi 6",
    wifi5: "WiFi 5 (BIDA and S2S)",
    wifi5_bida: "WiFi 5 (BIDA)",
    wifi5_s2s: "WiFi 5 (S2S)",
  },
  tableToggleProps: {
    active: {
      label: "View Archive",
      props: { w: 135 },
    },
    archive: {
      label: "View ONUs",
      props: { w: 135 },
    },
  },
  icons: {
    router: IconRouter,
    pendingIof: IconListDetails,
    ongoingTa: IconLoader3,
    completed: IconListCheck,
  },
};
