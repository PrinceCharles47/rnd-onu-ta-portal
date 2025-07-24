import {
  IconRouter,
  IconListDetails,
  IconListCheck,
  IconLoader3,
} from "@tabler/icons-react";

const OLT_HEADERS = [
  { name: "OLT", withSort: false },
  { name: "BRAS", withSort: false },
  { name: "Status", withSort: false },
  { name: "", withSort: false },
];

const OLT_DOCS_HEADERS = [
  { name: "OLT", withSort: false },
  { name: "BRAS", withSort: false },
  { name: "Document Status", withSort: false },
  { name: "", withSort: false },
];

const SERVICES_HEADERS = [
  {
    label: "FTTX",
    description: "FiberX",
    status: "ongoing",
  },
  {
    label: "Cielo",
    description: "SkyCable",
    status: "ongoing",
  },
  {
    label: "FAST",
    description: "",
    status: "complete",
  },
  {
    label: "IBIZ",
    description: "",
    status: "complete",
  },
];

const DASHBOARD_HEADERS = [
  { name: "Model", withSort: true },
  { name: "Status", withSort: true },
  { name: "Assignee", withSort: true },
  { name: "", withSort: false },
];

const ANALYTICS_CARD_HEADERS = [
  { title: "ONU Count", icon: IconRouter, value: "5" },
  {
    title: "pending IOF",
    icon: IconListDetails,
    value: "1",
  },
  {
    title: "Ongoing TA",
    icon: IconLoader3,
    value: "3",
  },
  { title: "Completed", icon: IconListCheck, value: "2" },
];

export {
  OLT_HEADERS,
  OLT_DOCS_HEADERS,
  SERVICES_HEADERS,
  DASHBOARD_HEADERS,
  ANALYTICS_CARD_HEADERS,
};
