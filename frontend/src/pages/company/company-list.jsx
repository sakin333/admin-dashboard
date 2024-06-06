import React, { useEffect, useMemo, useState } from "react";
import {
  List,
  Typography,
  Button,
  Table,
  Input,
  Space,
  Avatar,
  Spin,
} from "antd";
import {
  PlusSquareOutlined,
  SearchOutlined,
  FunnelPlotOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../redux/actions/modalAction";
import { fetchCompany } from "../../redux/actions/companyAction";
import { deleteCompany } from "../../redux/actions/companyAction";

const { Title } = Typography;

const CompanyList = ({ children }) => {
  const [companyName, setComapanyName] = useState("");
  const [allCompanies, setAllCompanies] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  const { company, loading } = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const naviagte = useNavigate();

  useEffect(() => {
    dispatch(fetchCompany());
  }, [dispatch]);

  // useEffect(() => {
  //   if (company && company.data) {
  //     setAllCompanies(company.data);
  //     setFilteredData(company.data);
  //   }
  // }, [company]);
  useMemo(() => {
    if (company) {
      setAllCompanies(company);
      setFilteredData(company);
    }
  }, [company]);

  const handleCreate = () => {
    dispatch(showModal());
    navigate("new");
  };

  const handleRecordEdit = (id) => {
    navigate(`edit/${id}`);
    dispatch(showModal());
  };

  const handleRecordDelete = (id) => {
    dispatch(deleteCompany(id));
  };

  const handleFilter = () => {
    const filtered = allCompanies.filter((item) =>
      item.name.toLowerCase().includes(companyName.toLowerCase())
    );
    setFilteredData(filtered);
    console.log("hereee", filtered);
  };

  const handleClearFilter = () => {
    setComapanyName("");
    setFilteredData(allCompanies);
  };

  return (
    <div
      style={{
        height: "93vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflowX: "auto",
      }}
    >
      {loading ? (
        <Spin size="large" style={{ marginTop: "-120px" }} />
      ) : (
        <div>
          <List
            header={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "16px 16px 0 16px",
                }}
              >
                <Title level={4}>Companies</Title>
                <Button
                  type="primary"
                  icon={<PlusSquareOutlined />}
                  onClick={handleCreate}
                >
                  Create
                </Button>
              </div>
            }
          >
            <Table dataSource={filteredData} style={{ padding: "0 16px" }}>
              <Table.Column
                dataIndex="name"
                title="Company Title"
                filterIcon={
                  <SearchOutlined style={{ color: "#333", fontSize: "14px" }} />
                }
                filterDropdown={() => (
                  <div
                    style={{
                      padding: "8px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    <Input
                      placeholder="Search Company"
                      value={companyName}
                      onChange={(e) => setComapanyName(e.target.value)}
                    />
                    <div
                      style={{
                        alignSelf: "end",
                        display: "flex",
                        gap: "8px",
                      }}
                    >
                      <Button
                        type="primary"
                        icon={<FunnelPlotOutlined />}
                        onClick={handleFilter}
                      >
                        Filter
                      </Button>
                      <Button danger onClick={handleClearFilter}>
                        Clear
                      </Button>
                    </div>
                  </div>
                )}
                render={(value, record) => (
                  <Space>
                    <Avatar
                      shape="square"
                      src={record.avatarUrl}
                      style={{ border: "1px solid #333" }}
                    />
                    <p>{record.name}</p>
                  </Space>
                )}
              />
              <Table.Column
                dataIndex="industry"
                title="Industry"
                render={(value, record) => <p>{record.industry}</p>}
              />
              <Table.Column
                dataIndex="location"
                title="Location"
                render={(value, record) => <p>{record.location.city}</p>}
              />
              <Table.Column
                dataIndex="value"
                title="Open deals amount"
                render={(value, record) => (
                  <p>${record.dealsAggregate?.sum?.value ?? 0}</p>
                )}
              />
              <Table.Column
                dataIndex="revenue"
                title="Revenue"
                render={(value, record) => <p>${record.revenue}</p>}
              />
              <Table.Column
                dataIndex="_id"
                title="Actions"
                fixed="right"
                render={(value, record) => (
                  <Space>
                    <Button
                      icon={<EditOutlined />}
                      size="small"
                      onClick={() => handleRecordEdit(record._id)}
                    />
                    <Button
                      icon={<DeleteOutlined />}
                      size="small"
                      danger
                      onClick={() => handleRecordDelete(record._id)}
                    />
                  </Space>
                )}
              />
            </Table>
          </List>
          {children}
        </div>
      )}
    </div>
  );
};

export default CompanyList;
