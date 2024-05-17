import { useDroppable } from "@dnd-kit/core";
import { Badge, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";

const KanbanColumn = ({ children }) => {
  const { isOver, setNodeRef, active } = useDroppable({
    id: "",
    data: "",
  });

  const count = 2;
  const title = "Title";
  const description = "Description";

  const handleAddClick = () => {};

  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0 16px",
        border: "1px solid red",
      }}
    >
      <div
        style={{
          padding: "12px",
          border: "1px solid red",
        }}
      >
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Space>
            <p
              style={{
                fontSize: "16px",
                textTransform: "uppercase",
                fontWeight: "bold",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </p>
            {!!count && <Badge count={count} color="cyan" />}
          </Space>
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            onClick={handleAddClick}
          />
        </Space>
        {description}
      </div>
      <div
        style={{
          flex: 1,
          overflowY: active ? "unset" : "scroll",
          border: "2px dashed transparent",
          borderColor: isOver ? "#000040" : "transparent",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            marginTop: "12px",
            border: "1px solid red",
            display: "flex",
            flexDirection: "column",
            padding: "0 16px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default KanbanColumn;
