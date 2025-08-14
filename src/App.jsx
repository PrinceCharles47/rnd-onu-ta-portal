// mantine
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";

// custom providers
import AlertProvider from "./providers/AlertProvider";
import ThemeProvider from "./providers/ThemeProvider";
import { ModalsProvider } from "@mantine/modals";

// routing related
import { RouterProvider } from "react-router";
import { router } from "./routes/routes";

// tanstack/react query
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/queryClient";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ModalsProvider>
          <Notifications />
          <AlertProvider>
            <RouterProvider router={router} />
          </AlertProvider>
        </ModalsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
