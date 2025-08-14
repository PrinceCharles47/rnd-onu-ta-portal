import cx from "clsx";
import { MantineProvider, createTheme, Container } from "@mantine/core";
import classes from "./ThemeProvider.module.css";

const theme = createTheme({
  primaryColor: "cyan",
  components: {
    // adds a 'responsive' value option to the Container's size prop.
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: cx({ [classes.responsiveContainer]: size === "responsive" }),
      }),
    }),
  },
});

export default ({ children }) => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      {children}
    </MantineProvider>
  );
};
