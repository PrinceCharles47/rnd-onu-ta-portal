import { Text, Container, Box, useComputedColorScheme } from "@mantine/core";
import classes from "./Headers.module.css";

export default function PageHeader({ title, subtitle }) {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const headerTheme =
    computedColorScheme === "light"
      ? { textColor: "black", bgTheme: classes.pageHeaderLight }
      : { textColor: "white", bgTheme: classes.pageHeaderDark };

  return (
    <div className={headerTheme.bgTheme}>
      <Container size="xl">
        <Box>
          <Text fz="xl" fw={700} c={headerTheme.textColor}>
            {title}
          </Text>
          <Text fz="sm" c={headerTheme.textColor}>
            {subtitle}
          </Text>
        </Box>
      </Container>
    </div>
  );
}
