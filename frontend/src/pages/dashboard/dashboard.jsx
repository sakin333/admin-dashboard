import React, { useEffect, useState } from "react";
import {
  DashboardTotalCountCard,
  DealsCharts,
  UpcomingEvents,
} from "../../components";
import { Row, Col } from "antd";
import {
  DollarOutlined,
  ProfileOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import SalesPerformanceCard from "../../components/home/sales-performance";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/actions/userAction";
import { fetchCompany } from "../../redux/actions/companyAction";
import { fetchDeals } from "../../redux/actions/dealAction";

const Dashboard = () => {
  const [noOfUsers, setNumberOfUsers] = useState(0);
  const [noOfCompanies, setNumberOfCompanies] = useState(0);
  const [noOfDealsWon, setNumberOfDealsWon] = useState(0);

  const { users } = useSelector((state) => state.user);
  const { company } = useSelector((state) => state.company);
  const { deals } = useSelector((state) => state.deal);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchCompany());
    dispatch(fetchDeals());
  }, [dispatch]);

  useEffect(() => {
    setNumberOfUsers(users.length || 0);
    setNumberOfCompanies(company.length || 0);
    setNumberOfDealsWon(deals.data.length || 0);
  }, [users, company, deals]);

  const salesData = [
    {
      product: "Product A",
      sales: [
        { month: "January", salesAmount: 5000 },
        { month: "February", salesAmount: 6000 },
        { month: "March", salesAmount: 5500 },
        { month: "April", salesAmount: 7000 },
        { month: "May", salesAmount: 7500 },
        { month: "June", salesAmount: 8000 },
      ],
    },
    {
      product: "Product B",
      sales: [
        { month: "January", salesAmount: 4000 },
        { month: "February", salesAmount: 4500 },
        { month: "March", salesAmount: 4800 },
        { month: "April", salesAmount: 5500 },
        { month: "May", salesAmount: 6000 },
        { month: "June", salesAmount: 6500 },
      ],
    },
    {
      product: "Product C",
      sales: [
        { month: "January", salesAmount: 3000 },
        { month: "February", salesAmount: 3500 },
        { month: "March", salesAmount: 3800 },
        { month: "April", salesAmount: 4000 },
        { month: "May", salesAmount: 4200 },
        { month: "June", salesAmount: 4500 },
      ],
    },
  ];
  return (
    <>
      <Row
        gutter={[32, 32]}
        style={{
          margin: "16px 0 0 0",
        }}
      >
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            title="Number of profiles"
            icon={<ProfileOutlined />}
            total={noOfUsers}
            data={[
              { type: "Profiles", value: noOfUsers },
              { type: "Other", value: 100 - noOfUsers },
            ]}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            title="Number of companies"
            icon={<TeamOutlined />}
            total={noOfCompanies}
            data={[
              { type: "Companies", value: noOfCompanies },
              { type: "Other", value: 100 - noOfCompanies },
            ]}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            title="Number of deals won"
            icon={<DollarOutlined />}
            total={noOfDealsWon}
            data={[
              { type: "Deals Won", value: noOfDealsWon },
              { type: "Other", value: 100 - noOfDealsWon },
            ]}
          />
        </Col>
      </Row>
      <Row
        gutter={[32, 32]}
        style={{
          margin: "16px 0 0 0",
        }}
      >
        <Col
          xs={24}
          sm={24}
          xl={8}
          style={{
            height: "460px",
          }}
        >
          <UpcomingEvents />
        </Col>
        <Col
          xs={24}
          sm={24}
          xl={16}
          style={{
            height: "460px",
          }}
        >
          <DealsCharts />
        </Col>
      </Row>
      <Row
        gutter={[32, 32]}
        style={{
          margin: "16px 0 0 0",
        }}
      >
        <Col
          xs={24}
          sm={24}
          xl={24}
          style={{
            height: "460px",
          }}
        >
          <SalesPerformanceCard data={salesData} />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
