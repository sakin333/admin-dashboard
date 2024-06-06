import React, { useEffect, useState } from "react";
import { Popover, Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import CustomAvatar from "../custom-avatar";

const CurrentUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [userInitials, setUserInitials] = useState("");

  const handleAvatarClicked = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchUser = async () => {
      let user = localStorage.getItem("user");
      if (user) {
        user = JSON.parse(user);
        setCurrentUser(user.username);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const array = currentUser.split(" ");
      let initials = "";
      if (array.length > 1) {
        initials = array[0].charAt(0) + array[array.length - 1].charAt(0);
      } else {
        initials = array[0].charAt(0);
      }
      setUserInitials(initials.toUpperCase());
    }
  }, [currentUser]);

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
        {currentUser}
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
        <CustomAvatar
          onClick={handleAvatarClicked}
          userInitials={userInitials}
        />
      </Popover>
      {}
    </>
  );
};

export default CurrentUser;
