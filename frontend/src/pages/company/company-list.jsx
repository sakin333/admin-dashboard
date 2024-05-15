import React, { useState } from "react";
import { List, Typography, Button, Table, Input, Space, Avatar } from "antd";
import {
  PlusSquareOutlined,
  SearchOutlined,
  FunnelPlotOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const data = [
  {
    key: "1",
    name: "John Doe",
    age: 35,
    address: "New York, NY",
    tags: ["awesome", "developer"],
  },
  {
    key: "2",
    name: "Jane Smith",
    age: 28,
    address: "Los Angeles, CA",
    tags: ["creative", "designer"],
  },
  {
    key: "3",
    name: "Michael Johnson",
    age: 45,
    address: "Chicago, IL",
    tags: ["experienced", "engineer"],
  },
  {
    key: "4",
    name: "Emily Brown",
    age: 30,
    address: "Houston, TX",
    tags: ["innovative", "developer"],
  },
  {
    key: "5",
    name: "Chris Wilson",
    age: 38,
    address: "Phoenix, AZ",
    tags: ["dedicated", "manager"],
  },
  {
    key: "6",
    name: "Maria Martinez",
    age: 42,
    address: "Philadelphia, PA",
    tags: ["skilled", "analyst"],
  },
  {
    key: "7",
    name: "Daniel Taylor",
    age: 29,
    address: "San Antonio, TX",
    tags: ["energetic", "engineer"],
  },
  {
    key: "8",
    name: "Jessica Anderson",
    age: 33,
    address: "San Diego, CA",
    tags: ["enthusiastic", "designer"],
  },
  {
    key: "9",
    name: "Ryan Moore",
    age: 40,
    address: "Dallas, TX",
    tags: ["productive", "developer"],
  },
  {
    key: "10",
    name: "Amanda Clark",
    age: 36,
    address: "San Jose, CA",
    tags: ["detail-oriented", "analyst"],
  },
  {
    key: "11",
    name: "David White",
    age: 31,
    address: "Austin, TX",
    tags: ["organized", "manager"],
  },
  {
    key: "12",
    name: "Samantha Lee",
    age: 39,
    address: "Indianapolis, IN",
    tags: ["insightful", "engineer"],
  },
  {
    key: "13",
    name: "Matthew Harris",
    age: 34,
    address: "Jacksonville, FL",
    tags: ["passionate", "developer"],
  },
  {
    key: "14",
    name: "Lauren King",
    age: 27,
    address: "San Francisco, CA",
    tags: ["creative", "designer"],
  },
  {
    key: "15",
    name: "Andrew Thompson",
    age: 43,
    address: "Columbus, OH",
    tags: ["experienced", "analyst"],
  },
  {
    key: "16",
    name: "Ashley Rodriguez",
    age: 32,
    address: "Charlotte, NC",
    tags: ["innovative", "engineer"],
  },
  {
    key: "17",
    name: "Joshua Taylor",
    age: 37,
    address: "San Antonio, TX",
    tags: ["dedicated", "manager"],
  },
  {
    key: "18",
    name: "Megan Hernandez",
    age: 26,
    address: "Denver, CO",
    tags: ["skilled", "developer"],
  },
  {
    key: "19",
    name: "Kevin Martinez",
    age: 41,
    address: "Detroit, MI",
    tags: ["energetic", "analyst"],
  },
  {
    key: "20",
    name: "Rachel Scott",
    age: 30,
    address: "Seattle, WA",
    tags: ["creative", "designer"],
  },
];

const CompanyList = () => {
  const [companyName, setComapanyName] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const navigate = useNavigate();
  const handleCreateClick = () => {
    navigate("/companies/new");
  };

  const handleRecordEdit = (value) => {
    console.log(value, "hereeeeeeeeeeeeeeeeeeee");
  };

  const handleRecordDelete = (value) => {
    console.log(value, "hereeeeeeeeeeeeeeeeeeee");
  };

  const handleFilter = () => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(companyName.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
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
            onClick={handleCreateClick}
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
                <Button danger onClick={() => setComapanyName("")}>
                  Clear
                </Button>
              </div>
            </div>
          )}
          render={(value, record) => (
            <Space>
              <Avatar shape="square">sm</Avatar>
              <p>{record.name}</p>
            </Space>
          )}
        />
        <Table.Column
          dataIndex="age"
          title="Open deals amount"
          render={(value, record) => <p>${record.age}</p>}
        />
        <Table.Column
          dataIndex="key"
          title="Actions"
          fixed="right"
          render={(value, record) => (
            <Space>
              <Button
                icon={<EditOutlined />}
                size="small"
                onClick={() => handleRecordEdit(record.key)}
              />
              <Button
                icon={<DeleteOutlined />}
                size="small"
                danger
                onClick={() => handleRecordDelete(record.key)}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};

export default CompanyList;
