// mantine
import "@mantine/core/styles.css";
import ThemeProvider from "./providers/ThemeProvider";

// routing related
import { RouterProvider } from "react-router";
import { router } from "./routes/routes";

// tanstack/react query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
