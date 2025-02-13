import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import Header from "../src/components/header";
import { useAuthStore } from "./store/app.store"; // Import your auth store
import "./App.scss";

export default function App() {
  const { pathname } = useLocation();
  const token = useAuthStore((state) => state.token); // Get token from store

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      {token && <Header />} {/* Show Header only if token exists */}
      <Outlet />
    </MantineProvider>
  );
}
