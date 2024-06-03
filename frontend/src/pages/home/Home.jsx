import React, { useState } from "react";
import HeaderComponent from "../../components/layout/header";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  LogoutOutlined,
  ProjectOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import Dashboard from "../dashboard/dashboard";

import "./Home.css";
import CompanyList from "../company/company-list";
import { Outlet, Link, useNavigate } from "react-router-dom";

const { Sider, Content, Header } = Layout;

const menuLinks = [
  {
    key: "1",
    icon: <DashboardOutlined />,
    label: "Dashboard",
    to: "/dashboard",
  },
  {
    key: "2",
    icon: <ShopOutlined />,
    label: "Companies",
    to: "/companies",
  },
  {
    key: "3",
    icon: <ProjectOutlined />,
    label: "Tasks",
    to: "/tasks",
  },
  {
    key: "4",
    icon: <LogoutOutlined />,
    label: "Logout",
    onClick: () => {
      localStorage.removeItem("user");
    },
  },
];

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    const selectedMenu = menuLinks.find((menu) => menu.key === e.key);
    if (selectedMenu && selectedMenu.key !== "4") {
      navigate(selectedMenu.to);
    } else {
      navigate("/login");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div className="home-logo">Logo</div>

        <Menu mode="inline" onClick={handleMenuClick} items={menuLinks} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
          }}
        >
          <HeaderComponent collapsed={collapsed} setCollapsed={setCollapsed} />
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
