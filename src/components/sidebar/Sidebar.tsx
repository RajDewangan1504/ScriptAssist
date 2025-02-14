import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Rocket, Globe, User } from "lucide-react";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    position: string;
  } | null>(null);

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const menuItems = [
    { text: "Species", icon: <Rocket size={20} />, path: "/species" },
    { text: "Planets", icon: <Globe size={20} />, path: "/planets" },
    { text: "Starships", icon: <Rocket size={20} />, path: "/starships" },
  ];

  const handleCategoryClick = (category: string) => {
    navigate(`/${category}/?category=${category}`);
  };

  return (
    <div
      style={{
        width: "240px",
        height: "100vh",
        backgroundColor: "white",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: "50px",
      }}
    >
      {/* Sidebar Menu */}
      <div style={{ marginTop: "20px" }}>
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(item.text)}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 15px",
              borderRadius: "8px",
              color: location.pathname === item.path ? "white" : "black",
              backgroundColor:
                location.pathname === item.path ? "#4A90E2" : "transparent",
              gap: "15px",
              fontSize: "16px",
              width: "100%",
              textAlign: "left",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
              fontWeight: location.pathname === item.path ? "bold" : "normal",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#E0E0E0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                location.pathname === item.path ? "#4A90E2" : "transparent";
            }}
          >
            <div
              style={{
                marginRight: "10px",
                color: location.pathname === item.path ? "white" : "black",
              }}
            >
              {item.icon}
            </div>
            <span style={{ flexGrow: 1 }}>{item.text}</span>
          </button>
        ))}
      </div>

      {/* User Info Section */}
      {user && (
        <div
          style={{
            padding: "15px",
            borderTop: "1px solid #ddd",
            backgroundColor: "#f9f9f9",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <User size={24} />
          <div>
            <div style={{ fontWeight: "bold", fontSize: "14px" }}>
              {user.firstName} {user.lastName}
            </div>
            <div style={{ fontSize: "12px", color: "#555" }}>{user.email}</div>
            <div style={{ fontSize: "12px", color: "#777" }}>{user.position}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
