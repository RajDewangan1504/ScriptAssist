import { FC, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../src/store/app.store";
import { Header, Box, Title, Button, Group, Burger, Drawer } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Home, Rocket, Satellite, Globe, LogOut } from "lucide-react";

const AppHeader: FC = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [opened, setOpened] = useState(false);

  const menuItems = [
    // { text: "Home", icon: <Home size={20} />, path: "/" },
    { text: "Species", icon: <Rocket size={20} />, path: "/species" },
    { text: "Planets", icon: <Globe size={20} />, path: "/planets" },
    { text: "Starships", icon: <Satellite size={20} />, path: "/starships" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/${category}/?category=${category}`);
  };

  return (
    <Header height={60} p="md" style={{ background: "white", color: "black",position:"fixed" }}>
      <Box mx="3%" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* App Name */}
        <Title order={3} style={{ cursor: "pointer", color: "black" }} onClick={() => navigate("/")}>
          Script Assist War
        </Title>

        {/* Responsive Navbar */}
        {isMobile ? (
          <>
            <Burger opened={opened} onClick={() => setOpened(!opened)} aria-label="Toggle navigation" color="black" />
            <Drawer opened={opened} onClose={() => setOpened(false)} padding="md" size="md" position="left">
              <div className="menu" style={{marginTop :"20px"}}>
                {menuItems.map((item, index) => (
                  <Button
                    key={index}
                    fullWidth
                    variant="subtle"
                    leftIcon={item.icon}
                    color={location.pathname === item.path ? "blue" : "black"}
                    onClick={() => {
                     handleCategoryClick(item.text),
                      setOpened(false);
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
                <Button color="red" fullWidth leftIcon={<LogOut size={20} />} onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </Drawer>
          </>
        ) : (
          <Group>
         
            <Button color="red" onClick={handleLogout}>
              Logout
            </Button>
          </Group>
        )}
      </Box>
    </Header>
  );
};

export default AppHeader;
