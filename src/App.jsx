// mantine
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import ThemeProvider from "./providers/ThemeProvider";
import { Notifications } from "@mantine/notifications";

import AlertProvider from "./providers/AlertProvider";

// routing related
import { RouterProvider } from "react-router";
import { router } from "./routes/routes";

// tanstack/react query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// const queryClient = new QueryClient({});
import { queryClient } from "./utils/queryClient";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Notifications />
        <AlertProvider>
          <RouterProvider router={router} />
        </AlertProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
