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
  Image,
  Text,
  Menu,
  Box,
  useComputedColorScheme,
} from "@mantine/core";

import NavLinksGroup from "./NavLinksGroup";

import logoLight from "../../assets/H_ConvergeLogo_Color.png";
import logoDark from "../../assets/H_ConvergeLogo_White.png";
import classes from "./Navigation.module.css";

import { useNavigate } from "react-router";

const mockdata = [
  {
    label: "Dashboard",
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: "Ongoing TA", link: "/" },
      { label: "Completed TA", link: "/completed-ta" },
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
  { label: "Tshoot Tool", icon: IconFileAnalytics, parentLink: "tshoot-tool" },
];

export function Navbar() {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const navigate = useNavigate();
  const links = mockdata.map((item) => (
    <NavLinksGroup {...item} key={item.label} />
  ));

  const logOut = () => {
    navigate("/sign-in");
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="center">
          <Image
            src={computedColorScheme === "light" ? logoLight : logoDark}
            maw={175}
          />
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton onLogOut={logOut} />
      </div>
    </nav>
  );
}

function UserButton({ onLogOut }) {
  return (
    <Box className={classes.user}>
      <Group>
        <Avatar radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500} lineClamp={1}>
            Prince Charles M. Clemente
          </Text>

          <Text c="dimmed" size="xs">
            Developer
          </Text>
        </div>

        {/* menu button */}
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon variant="subtle" radius="xl" aria-label="Settings">
              <IconDotsVertical stroke={1.5} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item leftSection={<IconSettings size={14} />}>
              Settings
            </Menu.Item>
            {/* <Menu.Divider /> */}
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
