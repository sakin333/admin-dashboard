import { Dropdown, Form, Input, List, Modal, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelModal } from "../../redux/actions/modalAction";
import TextArea from "antd/es/input/TextArea";
import { stages } from "../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { FlagOutlined, MenuOutlined } from "@ant-design/icons";
import { fetchUsers } from "../../redux/actions/userAction";

const CreateTaskPage = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedStage, setSelectedStage] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  const modalState = useSelector((state) => state.modal.isOpen);
  const { users } = useSelector((state) => state.user);
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
    console.log("modal state", modalState);
    dispatch(cancelModal());
    navigate("/tasks");
  };

  const handleCreateTask = () => {};

  const dropdownItems = stages.map((item, index) => {
    return {
      ...item,
      key: index + 1,
      onClick: () => setSelectedStage(item.label),
    };
  });

  return (
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
        <Form.Item name="taskStage" rules={[{ required: true }]}>
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
              }}
            >
              <FlagOutlined />
              {selectedStage ? selectedStage : <p>Select task stage</p>}
            </Space>
          </Dropdown>
        </Form.Item>
        <Form.Item label="Task Title" name="title" rules={[{ required: true }]}>
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
          rules={[{ required: selectedStage === "Unassigned" ? false : true }]}
        >
          <Select
            mode="multiple"
            placeholder="Select users to assign"
            options={users.data}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTaskPage;
