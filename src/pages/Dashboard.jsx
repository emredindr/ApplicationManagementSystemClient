import { useState, useEffect } from "react";
import { Layout } from "antd";
import Logo from "../components/Logo";
import MenuList from "../components/MenuList";
import ToogleThemeButton from "../components/ToogleThemeButton";
import Router from "../Router";
import Header from "../components/Header";

const { Sider, Content } = Layout;

const Dashboard = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={230} collapsed={collapsed} collapsible trigger={null} className="sidebar" theme={darkTheme ? "dark" : "light"}>
        <Logo />
        <MenuList darkTheme={darkTheme} />
        <ToogleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
      </Sider>
      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} darkTheme={darkTheme} />
        <Content>
          <Router />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
