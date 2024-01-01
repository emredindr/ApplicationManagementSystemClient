import React from "react";
import { Layout, Button, theme } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined, PoweroffOutlined } from "@ant-design/icons";
import { useAuth } from "../contexts/AuthContext";

const Header = ({ collapsed, setCollapsed, darkTheme }) => {
  const { loggedIn, logout } = useAuth();
  const { Header } = Layout;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header className="header" style={{ background: colorBgContainer }} theme={darkTheme ? "dark" : "light"}>
      <Button className="toggle" type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)}></Button>
      
      {loggedIn && (
        <Button className="logout" type="text" icon={<PoweroffOutlined />} onClick={logout}>
          Logout
        </Button>
      )}
    </Header>
  );
};

export default Header;
