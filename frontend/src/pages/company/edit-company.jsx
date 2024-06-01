import React, { useEffect, useState } from "react";
import { Form, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { cancelModal } from "../../redux/actions/modalAction";
import { useLocation, useParams } from "react-router-dom";
import { fetchCompany } from "../../redux/actions/companyAction";

const EditCompany = () => {
  const [selectedCompany, setSelectedCompany] = useState("");

  const { isOpen } = useSelector((state) => state.modal);
  const { company } = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const { id: selectedCompanyId } = useParams();

  useEffect(() => {
    const selectedCompany = company.find(
      (item) => item._id === selectedCompanyId
    );
    setSelectedCompany(selectedCompany);
  }, [selectedCompanyId, company]);

  useEffect(() => {
    console.log("selected", selectedCompany);
  }, [selectedCompany]);

  const handleCancel = () => {
    dispatch(cancelModal());
  };

  const handleEditTask = () => {};
  return (
    <Modal
      mask={true}
      open={isOpen}
      onCancel={handleCancel}
      title="Create Task"
      width={512}
      okText="Edit"
      onOk={handleEditTask}
    >
      <Form
        layout="vertical"
        name="edit_company_form"
        initialValues={selectedCompany}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: "Please input the company name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="dealsAggregate" label="Deals Aggregate">
          <Input />
        </Form.Item>
        <Form.Item name="industry" label="Industry">
          <Input />
        </Form.Item>
        <Form.Item name="location" label="Location">
          <Input />
        </Form.Item>
        <Form.Item name="foundedYear" label="Founded Year">
          <Input />
        </Form.Item>
        <Form.Item name="employees" label="Employees">
          <Input />
        </Form.Item>
        <Form.Item name="revenue" label="Revenue">
          <Input />
        </Form.Item>
        <Form.Item name="website" label="Website">
          <Input />
        </Form.Item>
        <Form.Item
          name="contactEmail"
          label="Contact Email"
          rules={[{ type: "email", message: "Please enter a valid email!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCompany;
