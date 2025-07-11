import { useState } from "react";
import {
  IconBellRinging,
  IconDatabaseImport,
  IconFingerprint,
  IconKey,
  IconLogout,
  IconReceipt2,
  IconSettings,
  IconSwitchHorizontal,
  IconAdjustments,
  IconCalendarStats,
  IconFileAnalytics,
  IconGauge,
  IconLock,
  IconNotes,
  IconChevronRight,
} from "@tabler/icons-react";
import {
  Code,
  ScrollArea,
  Avatar,
  Group,
  Text,
  UnstyledButton,
} from "@mantine/core";
import NavLinksGroup from "./NavLinksGroup";
import classes from "./Navigation.module.css";

const mockdata = [
  {
    label: "Dashboard",
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: "Ongoing TA", link: "/dashboard/ongoing-ta" },
      { label: "Completed TA", link: "/dashboard/completed-ta" },
    ],
  },
  {
    label: "User",
    icon: IconCalendarStats,
    links: [
      { label: "Users List", link: "/user/users-list" },
      { label: "Settings", link: "/user/settings" },
    ],
  },
  {
    label: "Topology",
    icon: IconCalendarStats,
    links: [
      { label: "Services", link: "/topology/services" },
      { label: "Test Plan", link: "/topology/test-plan" },
    ],
  },
  { label: "Tshoot Tool", icon: IconFileAnalytics },
];

export function Navbar() {
  const links = mockdata.map((item) => (
    <NavLinksGroup {...item} key={item.label} />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Code fw={700}>v3.1.2</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
}

function UserButton() {
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            Harriette Spoonlicker
          </Text>

          <Text c="dimmed" size="xs">
            hspoonlicker@outlook.com
          </Text>
        </div>

        <IconChevronRight size={14} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}
