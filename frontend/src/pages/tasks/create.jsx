import {
  DatePicker,
  Dropdown,
  Form,
  Input,
  Modal,
  Select,
  Space,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelModal } from "../../redux/actions/modalAction";
import TextArea from "antd/es/input/TextArea";
import { stages } from "../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { FlagOutlined } from "@ant-design/icons";
import { fetchUsers } from "../../redux/actions/userAction";
import { createTask } from "../../redux/actions/taskAction";
import dayjs from "dayjs";
import { snackbar } from "../../utils/snackbar";

const CreateTaskPage = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedStage, setSelectedStage] = useState(null);
  const [createdDate, setCreatedDate] = useState(dayjs());
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();
  const location = useLocation();

  const modalState = useSelector((state) => state.modal.isOpen);
  const { users } = useSelector((state) => state.user);
  const { tasks } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const stage = params.get("stage");
    if (stage) {
      setSelectedStage(stage);
    }
  }, [location.search]);

  const handleCancel = () => {
    dispatch(cancelModal());
    navigate("/tasks");
  };

  const handleCreateTask = () => {
    if (
      !taskTitle ||
      !description ||
      !selectedStage ||
      !createdDate ||
      !assignedUsers.length ||
      !dueDate
    ) {
      snackbar(api, "error", "Enter required fields");
      return false;
    }
    const id = `task-${tasks.length}`;
    const stageObj = stages.find((stage) => stage.label === selectedStage);
    const stageId = stageObj ? stageObj.stageId : null;

    const data = {
      id,
      title: taskTitle,
      description,
      dueDate: dueDate.format("YYYY-MM-DD"),
      completed: false,
      stageId,
      users: assignedUsers.map((username) =>
        users.find((user) => user.username === username)
      ),
      createdAt: createdDate.format("YYYY-MM-DD"),
      updatedAt: dayjs().format("YYYY-MM-DD"),
    };
    dispatch(createTask(data));
    snackbar(api, "success", "Task created successfully");
    handleCancel();
  };

  const usersDropdownOptions = () => {
    return users.map((user) => ({
      value: user.username,
      label: user.username,
    }));
  };

  const dropdownItems = stages.map((item, index) => {
    return {
      key: index + 1,
      label: item.label,
      onClick: () => setSelectedStage(item.label),
    };
  });

  return (
    <>
      {contextHolder}
      <Modal
        mask={true}
        open={modalState}
        onCancel={handleCancel}
        title="Create Task"
        width={512}
        okText="Create"
        onOk={handleCreateTask}
      >
        <Form layout="vertical">
          <div
            style={{
              display: "flex",
              gap: "16px",
            }}
          >
            <Form.Item
              label="Task stage"
              name="taskStage"
              rules={[{ required: true }]}
              style={{
                width: "50%",
              }}
            >
              <Dropdown
                trigger={["click"]}
                menu={{
                  items: dropdownItems,
                }}
              >
                <Space
                  style={{
                    cursor: "pointer",
                    border: "1px solid #ccc",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    width: "100%",
                  }}
                >
                  <FlagOutlined />
                  {selectedStage || "Select task stage"}
                </Space>
              </Dropdown>
            </Form.Item>
            <Form.Item
              label="Created at"
              name="createDate"
              rules={[{ required: true }]}
              style={{
                width: "50%",
              }}
            >
              <Space
                style={{
                  border: "1px solid #ccc",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  width: "100%",
                }}
              >
                <p>{createdDate.format("YYYY/MM/DD")}</p>
              </Space>
            </Form.Item>
          </div>
          <Form.Item
            label="Task Title"
            name="title"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Please enter task title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Task Description"
            name="description"
            rules={[{ required: true }]}
          >
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add description"
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
            />
          </Form.Item>
          <Form.Item
            label="Assigned To"
            name="users"
            rules={[
              { required: selectedStage === "Unassigned" ? false : true },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select users to assign"
              options={usersDropdownOptions()}
              value={assignedUsers}
              onChange={(value) => setAssignedUsers(value)}
            />
          </Form.Item>
          <Form.Item
            label="Due Date"
            name="dueDate"
            rules={[{ required: true }]}
          >
            <DatePicker
              value={dueDate}
              onChange={(date) => setDueDate(date)}
              format="YYYY/MM/DD"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateTaskPage;
