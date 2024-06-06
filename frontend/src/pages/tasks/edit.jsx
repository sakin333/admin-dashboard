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
import { useParams } from "react-router-dom";
import { stages } from "../../constants";
import { FlagOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { cancelModal } from "../../redux/actions/modalAction";
import moment from "moment";
import dayjs from "dayjs";
import { fetchUsers } from "../../redux/actions/userAction";
import { snackbar } from "../../utils/snackbar";
import { editTask } from "../../redux/actions/taskAction";

const EditTaskPage = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);

  const [api, contextHolder] = notification.useNotification();

  const { isOpen } = useSelector((state) => state.modal);
  const { users } = useSelector((state) => state.user);
  const { tasks } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const { id: selectedTaskId } = useParams();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const selectedTask = tasks.find((item) => item._id === selectedTaskId);
    setSelectedTask(selectedTask);
  }, [selectedTaskId, tasks]);

  useEffect(() => {
    if (selectedTask) {
      form.setFieldsValue({
        ...selectedTask,
        createdDate: moment(selectedTask.createdAt),
        dueDate: moment(selectedTask.dueDate),
        users: selectedTask.users?.map((user) => user.username) || [],
        updatedAt: dayjs(),
      });
      setSelectedStage(
        stages.find((stage) => stage.stageId === selectedTask.stageId)?.label
      );
    }
  }, [selectedTask, form]);

  const handleCancel = () => {
    dispatch(cancelModal());
  };

  const handleEditTask = () => {
    form
      .validateFields()
      .then((values) => {
        const { taskStage, users: selectedUsernames, ...rest } = values;
        const data = {
          ...rest,
          stageId: stages.find((stage) => stage.label === selectedStage)
            ?.stageId,
          users: users.filter((user) =>
            selectedUsernames.includes(user.username)
          ),
        };
        dispatch(editTask(selectedTaskId, data));
        snackbar(api, "success", "Task details successfully updated");
        handleCancel();
      })
      .catch((info) => {
        snackbar(api, "error", "Enter required fields");
      });
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
        open={isOpen}
        onCancel={handleCancel}
        title="Task"
        width={512}
        okText="Update"
        onOk={handleEditTask}
      >
        <Form form={form} layout="vertical" name="edit_task_form">
          <div
            style={{
              display: "flex",
              gap: "16px",
            }}
          >
            <Form.Item
              label="Task stage"
              name="taskStage"
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
                  {selectedStage}
                </Space>
              </Dropdown>
            </Form.Item>
            <Form.Item
              label="Created at"
              name="createdDate"
              style={{
                width: "50%",
              }}
            >
              <Input readOnly style={{ padding: "8px 16px" }} />
            </Form.Item>
          </div>
          <Form.Item label="Task Title" name="title">
            <Input
              placeholder="Please enter task title"
              style={{ padding: "8px 16px" }}
            />
          </Form.Item>
          <Form.Item label="Task Description" name="description">
            <TextArea
              placeholder="Add description"
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
            />
          </Form.Item>
          <Form.Item label="Assigned To" name="users">
            <Select
              mode="multiple"
              placeholder="Select users to assign"
              options={usersDropdownOptions()}
            />
          </Form.Item>
          <div
            style={{
              display: "flex",
              gap: "16px",
            }}
          >
            <Form.Item
              label="Due Date"
              name="dueDate"
              style={{
                width: "50%",
              }}
            >
              <Input readOnly style={{ padding: "8px 16px" }} />
            </Form.Item>
            <Form.Item
              label="Updated At"
              name="updatedAt"
              style={{
                width: "50%",
              }}
            >
              <Input readOnly style={{ padding: "8px 16px" }} />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default EditTaskPage;
