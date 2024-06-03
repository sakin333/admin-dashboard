import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Select, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { cancelModal } from "../../redux/actions/modalAction";
import { useParams } from "react-router-dom";
import { snackbar } from "../../utils/snackbar";
import { updateCompany } from "../../redux/actions/companyAction";

const EditCompany = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  const { isOpen } = useSelector((state) => state.modal);
  const { company } = useSelector((state) => state.company);

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: selectedCompanyId } = useParams();

  useEffect(() => {
    const selectedCompany = company.find(
      (item) => item._id === selectedCompanyId
    );
    setSelectedCompany(selectedCompany);
  }, [selectedCompanyId, company]);

  useEffect(() => {
    if (selectedCompany) {
      form.setFieldsValue({
        ...selectedCompany,
        location: selectedCompany.location?.city,
        dealsAggregate: selectedCompany.dealsAggregate?.sum?.value,
      });
    }
  }, [selectedCompany, form]);

  const handleCancel = () => {
    dispatch(cancelModal());
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const industryOptions = [
    { label: "Technology", value: "Technology" },
    { label: "Finance", value: "Finance" },
    { label: "Healthcare", value: "Healthcare" },
    { label: "Education", value: "Education" },
  ];

  const locationOptions = [
    { label: "New York", value: "New York" },
    { label: "San Francisco", value: "San Francisco" },
    { label: "Chicago", value: "Chicago" },
    { label: "Los Angeles", value: "Los Angeles" },
  ];

  const foundedYearOptions = [];
  for (let year = 1900; year <= new Date().getFullYear(); year++) {
    foundedYearOptions.push({ label: year.toString(), value: year.toString() });
  }

  const handleEditTask = () => {
    form
      .validateFields()
      .then((values) => {
        dispatch(updateCompany(selectedCompanyId, values));
        snackbar(api, "success", "Company details successfully updated");
        handleCancel();
      })
      .catch((info) => {
        snackbar(api, "error", "Enter required fields");
      });
  };

  return (
    <>
      {contextHolder}
      <Modal
        mask={true}
        open={isOpen}
        onCancel={handleCancel}
        title="Edit Company"
        width={512}
        okText="Edit"
        onOk={handleEditTask}
      >
        <Form form={form} layout="vertical" name="edit_company_form">
          <div style={{ display: "flex", gap: "16px" }}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please input the company name!" },
              ]}
              style={{ width: "50%" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="industry"
              label="Industry"
              style={{ width: "50%" }}
            >
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={filterOption}
                options={industryOptions}
              />
            </Form.Item>
          </div>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <div style={{ display: "flex", gap: "16px" }}>
            <Form.Item
              name="location"
              label="Location"
              style={{ width: "50%" }}
            >
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={filterOption}
                options={locationOptions}
              />
            </Form.Item>
            <Form.Item
              name="foundedYear"
              label="Founded Year"
              style={{ width: "50%" }}
            >
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={filterOption}
                options={foundedYearOptions}
              />
            </Form.Item>
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <Form.Item
              name="dealsAggregate"
              label="Deals Aggregate"
              style={{ width: "50%" }}
            >
              <Input prefix="$" type="number" />
            </Form.Item>
            <Form.Item name="revenue" label="Revenue" style={{ width: "50%" }}>
              <Input prefix="$" type="number" />
            </Form.Item>
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <Form.Item
              name="employees"
              label="Employees"
              style={{ width: "50%" }}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item name="website" label="Website" style={{ width: "50%" }}>
              <Input />
            </Form.Item>
          </div>
          <Form.Item
            name="contactEmail"
            label="Contact Email"
            rules={[{ type: "email", message: "Please enter a valid email!" }]}
          >
            <Input type="email" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditCompany;
