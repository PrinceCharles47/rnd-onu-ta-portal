// mantine
import "@mantine/core/styles.css";
import ThemeProvider from "./providers/ThemeProvider";

// auth
import { AuthProvider } from "./providers/AuthProvider";

// routing related
import { RouterProvider } from "react-router";
import { router } from "./routes/routes";

// tanstack/react query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
