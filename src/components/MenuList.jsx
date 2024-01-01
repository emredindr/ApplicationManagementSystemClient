import { Menu } from "antd";
import { HomeOutlined, CloudUploadOutlined, AreaChartOutlined, LoginOutlined, DashboardOutlined, OrderedListOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const MenuList = ({ darkTheme }) => {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  const menuItems = !loggedIn
    ? [
        {
          label: "Home",
          key: "/",
          icon: <HomeOutlined />,
          text: "Home",
        },
        {
          label: "Create Application",
          key: "/application-create",
          icon: <CloudUploadOutlined />,
          text: "Activity",
        },
        {
          label: "Application Status",
          key: "/application-status",
          icon: <AreaChartOutlined />,
          text: "Progress",
        },
        {
          label: "Login",
          key: "/login",
          icon: <LoginOutlined />,
          text: "Payment",
        },
      ]
    : [
        {
          label: "Admin Dashboard",
          key: "/admin",
          icon: <DashboardOutlined />,
          text: "Dashboard",
        },
        {
          label: "Application List",
          key: "/admin/application-list",
          icon: <OrderedListOutlined />,
          text: "Application List",
        },
      ];
  return <Menu theme={darkTheme ? "dark" : "light"} mode="inline" defaultSelectedKeys={[window.location.pathname]} className="menu-bar" onClick={({ key }) => navigate(key)} items={menuItems}></Menu>;
};

export default MenuList;
