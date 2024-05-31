import { useDroppable } from "@dnd-kit/core";
import { Badge, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";

const KanbanColumn = ({
  children,
  id,
  title,
  description,
  count,
  data,
  onAddClick,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  const handleAddClick = () => {
    onAddClick?.(title);
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0 16px",
        width: "310px",
      }}
    >
      <div
        style={{
          padding: "12px",
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
      </div>
      <div
        style={{
          flex: 1,
          border: "2px dashed transparent",
          borderColor: isOver ? "#000040" : "transparent",
          borderRadius: "4px",
          maxHeight: "calc(93vh - 200px)",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            marginTop: "12px",
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
