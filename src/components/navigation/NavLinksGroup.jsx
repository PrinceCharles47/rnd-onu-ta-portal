import { useState } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { Box, Collapse, Group, ThemeIcon, UnstyledButton } from "@mantine/core";
import { Link } from "react-router";
import classes from "./Navigation.module.css";

export default function NavLinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  parentLink,
  links,
}) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <Link className={classes.link} to={link.link} key={link.label}>
      {link.label}
    </Link>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
      >
        <Group justify="space-between" gap={0}>
          <MainNavItemWrapper parentLink={parentLink}>
            <ThemeIcon variant="light" size={30} radius="md">
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </MainNavItemWrapper>

          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              size={16}
              style={{ transform: opened ? "rotate(-90deg)" : "none" }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

function MainNavItemWrapper({ parentLink, children }) {
  return parentLink ? (
    <Link
      to={parentLink}
      style={{
        display: "flex",
        flexGrow: 1,
        alignItems: "center",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      {children}
    </Link>
  ) : (
    <Box style={{ display: "flex", alignItems: "center" }}>{children}</Box>
  );
}
