// mantine
import "@mantine/core/styles.css";
import ThemeProvider from "./providers/ThemeProvider";

// routing related
import { RouterProvider } from "react-router";
import { router } from "./routes/routes";

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />;
    </ThemeProvider>
  );
}
