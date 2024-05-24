import React from "react";
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

const Dashboard = () => {
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
            total={34}
            data={[
              { type: "Profiles", value: 34 },
              { type: "Other", value: 100 - 34 },
            ]}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            title="Number of companies"
            icon={<TeamOutlined />}
            total={12}
            data={[
              { type: "Companies", value: 12 },
              { type: "Other", value: 100 - 12 },
            ]}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            title="Number of deals won"
            icon={<DollarOutlined />}
            total={20}
            data={[
              { type: "Deals Won", value: 20 },
              { type: "Other", value: 100 - 20 },
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
