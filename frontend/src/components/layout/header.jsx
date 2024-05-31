import React from "react";
import CurrentUser from "./current-user";
import { Button, Layout, Space } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const HeaderComponent = ({ collapsed, setCollapsed }) => {
  const headerStyles = {
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 24px 0 0",
    position: "sticky",
    top: 0,
    zIndexx: 999,
    height: "7vh",
  };

  return (
    <Layout.Header style={headerStyles}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <Space align="center" size="middle">
        <CurrentUser />
      </Space>
    </Layout.Header>
  );
};

export default HeaderComponent;
