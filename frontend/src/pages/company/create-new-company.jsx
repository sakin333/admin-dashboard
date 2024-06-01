import React, { useEffect, useState } from "react";
import { Avatar, Form, Input, Modal, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cancelModal } from "../../redux/actions/modalAction";
import { fetchUsers } from "../../redux/actions/userAction";

const CreateCompany = () => {
  const [companyName, setCompanyName] = useState("");
  const [owner, setOwner] = useState("");

  const navigate = useNavigate();
  const modalState = useSelector((state) => state.modal);
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleCancel = () => {
    dispatch(cancelModal());
    navigate("/companies");
  };

  const handleCreateFormSubmission = () => {
    console.log("form values", { companyName, owner });
  };

  return (
    <Modal
      mask={true}
      open={modalState}
      onCancel={handleCancel}
      title="Create Company"
      width={512}
      okText="Save"
      onOk={handleCreateFormSubmission}
    >
      <Form layout="vertical">
        <Form.Item
          label="Company name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input
            placeholder="Please enter a company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Sales owner"
          name="salesOwnerId"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Please select sales owner"
            options={
              users.map((user) => ({
                value: user._id,
                label: (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Avatar
                      size="small"
                      shape="circle"
                      src={user.avatarUrl ?? "SM"}
                      style={{
                        marginTop: "-6px",
                      }}
                    />
                    <p>{user.username}</p>
                  </div>
                ),
              })) ?? []
            }
            value={owner}
            onChange={(value) => setOwner(value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCompany;
