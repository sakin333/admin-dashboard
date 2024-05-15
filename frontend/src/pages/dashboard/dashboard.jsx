import React from "react";
import {
  DashboardTotalCountCard,
  DealsCharts,
  UpcomingEvents,
} from "../../components";
import { Row, Col } from "antd";

const Dashboard = () => {
  return (
    <>
      <Row
        gutter={[32, 32]}
        style={{
          margin: "16px 0 0 0",
        }}
      >
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard />
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
    </>
  );
};

export default Dashboard;
