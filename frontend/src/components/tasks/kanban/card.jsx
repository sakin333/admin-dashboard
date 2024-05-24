import React, { useMemo, useState } from "react";
import {
  Avatar,
  Card,
  Dropdown,
  Space,
  Tag,
  Tooltip,
  notification,
} from "antd";
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { getDateColor } from "../../../utils/dateColor";
import { ellipsis } from "../../../utils/ellipsis";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../../redux/actions/taskAction";
import { snackbar } from "../../../utils/snackbar";

const ProjectCard = ({ id, title, dueDate, users }) => {
  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteCard = () => {
    dispatch(deleteTask(id));
    snackbar(api, "Task deleted successfully", <DeleteOutlined />);
  };

  const dropdownItems = useMemo(() => {
    const dropdownItems = [
      {
        label: "View card",
        key: "1",
        icon: <EyeOutlined />,
        onClick: () => {
          navigate(`edit/${id}`);
        },
      },
      {
        danger: true,
        label: "Delete card",
        key: "2",
        icon: <DeleteOutlined />,
        onClick: deleteCard,
      },
    ];
    return dropdownItems;
  }, []);

  const dueDateOptions = useMemo(() => {
    if (!dueDate) return null;

    const date = dayjs(dueDate);

    return {
      color: getDateColor(dueDate),
      text: date.format("MMM DD"),
    };
  }, [dueDate]);

  return (
    <Card
      size="small"
      title={<p>{ellipsis(title, 20)}</p>}
      onClick={() => edit()}
      style={{
        width: "100%",
        padding: "4px 8px",
      }}
      extra={
        <Dropdown
          trigger={["click"]}
          menu={{
            items: dropdownItems,
          }}
        >
          <MenuOutlined />
        </Dropdown>
      }
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {dueDateOptions && (
          <Tag
            icon={<ClockCircleOutlined style={{ fontSize: "12px" }} />}
            style={{
              padding: "0 4px",
              backgroundColor:
                dueDateOptions.color === "default" ? "transparent" : "unset",
            }}
            color={dueDateOptions.color}
            bordered={dueDateOptions.color !== "default"}
          >
            {dueDateOptions.text}
          </Tag>
        )}
        {!!users?.length && (
          <Space
            size={2}
            wrap
            direction="horizontal"
            align="center"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginLeft: "auto",
              marginRight: 0,
            }}
          >
            {users.map((user) => (
              <Tooltip key={user.id} title={user.name}>
                <Avatar src={user.avatarUrl} style={{ marginRight: "-8px" }} />
              </Tooltip>
            ))}
          </Space>
        )}
      </div>
    </Card>
  );
};

export default ProjectCard;
