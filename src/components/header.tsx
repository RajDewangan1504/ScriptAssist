import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../src/store/app.store";
import { Header, Box, Title, Button, Group, Burger, Drawer } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const AppHeader: FC = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [opened, setOpened] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Header height={60} p="md">
      <Box mx="5%" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Title order={3} style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Script Assist</Title>
        {isMobile ? (
          <>
            <Burger opened={opened} onClick={() => setOpened((o) => !o)} aria-label="Toggle navigation" />
            <Drawer opened={opened} onClose={() => setOpened(false)} padding="md" size="md">
              <Button variant="subtle" fullWidth onClick={() => { navigate("/"); setOpened(false); }}>Home</Button>
              <Button variant="subtle" fullWidth onClick={() => { navigate("/"); setOpened(false); }}>Dashboard</Button>
              <Button color="red" fullWidth onClick={() => { handleLogout(); setOpened(false); }}>Logout</Button>
            </Drawer>
          </>
        ) : (
          <Group>
            <Button variant="subtle" onClick={() => navigate("/")}>Home</Button>
            <Button variant="subtle" onClick={() => navigate("/")}>Dashboard</Button>
            <Button color="red" onClick={handleLogout}>Logout</Button>
          </Group>
        )}
      </Box>
    </Header>
  );
};

export default AppHeader;
