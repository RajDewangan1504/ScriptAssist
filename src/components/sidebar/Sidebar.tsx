import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Rocket, Globe, User } from "lucide-react";
import "./Sidebar.scss"; // Import SCSS file

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
    <div className="sidebar">
      <div className="menu">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`menu-item ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => handleCategoryClick(item.text)}
          >
            <div className="icon">{item.icon}</div>
            <span className="text">{item.text}</span>
          </button>
        ))}
      </div>

      {user && (
        <div className="user-info">
          <User size={24} />
          <div>
            <div className="user-name">{user.firstName} {user.lastName}</div>
            <div className="user-email">{user.email}</div>
            <div className="user-position">{user.position}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
