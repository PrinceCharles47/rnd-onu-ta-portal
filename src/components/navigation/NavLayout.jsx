import {
  AppShell,
  Box,
  Burger,
  Flex,
  ActionIcon,
  Group,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import cx from "clsx";
import { useDisclosure } from "@mantine/hooks";
import { Navbar } from "./Navbar";

import classes from "./Navigation.module.css";

export default function NavLayout({ children }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header>
        <Flex mx="md" h="100%" align="center" justify="space-between">
          <Box>
            <Burger
              onClick={toggleDesktop}
              aria-label="Toggle navigation"
              visibleFrom="sm"
            />
            <Burger
              onClick={toggleMobile}
              aria-label="Toggle navigation"
              hiddenFrom="sm"
            />
          </Box>

          <Group justify="center">
            <ActionIcon
              onClick={() =>
                setColorScheme(
                  computedColorScheme === "light" ? "dark" : "light"
                )
              }
              variant="default"
              size="xl"
              radius="md"
              aria-label="Toggle color scheme"
            >
              <IconSun
                className={cx(classes.icon, classes.light)}
                stroke={1.5}
              />
              <IconMoon
                className={cx(classes.icon, classes.dark)}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main className={classes.appShellMain}>{children}</AppShell.Main>
    </AppShell>
  );
}
