
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import Header from "../src/components/header";
import Sidebar from "../src/components/sidebar/Sidebar";
import { useAuthStore } from "./store/app.store";
import "./App.scss";

export default function App() {
  const { pathname } = useLocation();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      {token && (
        <div className="app-layout">
          <Header />
          <div className="content-layout">
            <Sidebar />
            <div className="main-content">
              <Outlet />
            </div>
          </div>
        </div>
      )}
      {!token && <Outlet />}
    </MantineProvider>
  );
}
