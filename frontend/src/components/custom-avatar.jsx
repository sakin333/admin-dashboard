import React from "react";
import { Avatar } from "antd";

const CustomAvatar = ({ onClick }) => {
  return (
    <Avatar
      alt={"Sakin Maharjan"}
      size="large"
      style={{
        backgroundColor: "#87d068",
        display: "flex",
        alignItems: "center",
        border: "none",
        verticalAlign: "middle",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      SM
    </Avatar>
  );
};

export default CustomAvatar;
