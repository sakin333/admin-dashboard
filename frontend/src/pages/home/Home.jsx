import React, { useState } from "react";
import HeaderComponent from "../../components/layout/header";
import { Layout, Menu, Row, Col } from "antd";
import {
  DashboardOutlined,
  LogoutOutlined,
  ProjectOutlined,
  ShopOutlined,
} from "@ant-design/icons";

import "./Home.css";
import { DealsCharts, UpcomingEvents } from "../../components";

const { Sider, Content, Header } = Layout;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ height: "auto" }}
      >
        <div className="home-logo">Logo</div>

        <Menu
          mode="inline"
          items={[
            {
              key: "1",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
            {
              key: "2",
              icon: <ShopOutlined />,
              label: "Companies",
            },
            {
              key: "3",
              icon: <ProjectOutlined />,
              label: "Tasks",
            },
            {
              key: "4",
              icon: <LogoutOutlined />,
              label: "Logout",
            },
          ]}
        />
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
          <Row
            gutter={[32, 32]}
            style={{
              border: "1px solid red",
              margin: "16px 0 0 0",
            }}
          >
            <Col
              xs={24}
              sm={24}
              xl={8}
              style={{
                height: "460px",
                border: "1px solid blue",
              }}
            >
              <UpcomingEvents />
            </Col>
            <Col
              xs={24}
              sm={24}
              xl={8}
              style={{
                height: "460px",
                border: "1px solid blue",
              }}
            >
              <DealsCharts />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
