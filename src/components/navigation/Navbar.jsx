import {
  IconCalendarStats,
  IconFileAnalytics,
  IconNotes,
  IconDotsVertical,
  IconLogout,
  IconSettings,
} from "@tabler/icons-react";
import {
  ActionIcon,
  ScrollArea,
  Avatar,
  Group,
  Text,
  Menu,
  Box,
  useComputedColorScheme,
} from "@mantine/core";

import NavLinksGroup from "./NavLinksGroup";

import logoLight from "../../assets/ConvergeLogo_Color.png";
import logoDark from "../../assets/ConvergeLogo_White.png";
import classes from "./Navigation.module.css";

import { useNavigate } from "react-router";
import { useCurrentUser } from "../../hooks/user/useCurrentUser";
import { useAuth } from "../../hooks/auth/useAuth";

const navDetails = [
  {
    label: "Dashboard",
    icon: IconNotes,
    initiallyOpened: true,
    parentLink: "/",
  },
  {
    label: "Documents",
    icon: IconNotes,
    parentLink: "/documents",
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
  { label: "Tshoot Tool", icon: IconFileAnalytics, parentLink: "tshoot-tool" },
];

export function Navbar() {
  const { currentUser } = useCurrentUser();
  const { logOut } = useAuth();

  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const navigate = useNavigate();
  const links = navDetails.map((item) => (
    <NavLinksGroup {...item} key={item.label} />
  ));

  const handleLogout = () => {
    logOut();
    navigate("/sign-in");
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.titleBar}>
        <Box className={classes.systemTitle}>
          <Group>
            <Avatar
              src={computedColorScheme === "light" ? logoLight : logoDark}
              size={30}
            />
            <div style={{ flex: 1 }}>
              <Text fz="sm" fw={700} lineClamp={1}>
                CONVERGE ICT
              </Text>

              <Text c="dimmed" size="xs">
                ONU Type Approval Portal
              </Text>
            </div>
          </Group>
        </Box>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton user={currentUser?.data?.profile} onLogOut={handleLogout} />
      </div>
    </nav>
  );
}

function UserButton({ user, onLogOut }) {
  return (
    <Box className={classes.user}>
      <Group>
        <Avatar radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500} lineClamp={1}>
            {user?.username}
          </Text>

          <Text c="dimmed" size="xs">
            {user?.companyName}
          </Text>
        </div>

        {/* menu button */}
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon variant="subtle" radius="md" aria-label="Settings">
              <IconDotsVertical stroke={1.5} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item leftSection={<IconSettings size={14} />}>
              Settings
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              color="red"
              leftSection={<IconLogout size={14} />}
              onClick={onLogOut}
            >
              Log out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Box>
  );
}
