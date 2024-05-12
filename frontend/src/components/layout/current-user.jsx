import React, { useState } from "react";
import { Popover, Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import CustomAvatar from "../custom-avatar";

const CurrentUser = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAvatarClicked = () => {
    setIsOpen(!isOpen);
  };

  const content = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "8px",
      }}
    >
      <p
        style={{ textAlign: "center", fontWeight: "bold", marginBottom: "8px" }}
      >
        Username
      </p>
      <div
        style={{
          borderTop: "1px solid #d9d9d9",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <Button
          style={{ textAlign: "left" }}
          icon={<SettingOutlined />}
          type="text"
          block
          onClick={() => setIsOpen(true)}
        >
          Account Settings
        </Button>
      </div>
    </div>
  );
  return (
    <>
      <Popover
        placement="bottomRight"
        trigger="click"
        overlayInnerStyle={{ padding: 0 }}
        overlayStyle={{ zIndex: 999 }}
        content={content}
      >
        <CustomAvatar onClick={handleAvatarClicked} />
      </Popover>
      {}
    </>
  );
};

export default CurrentUser;
