import React from "react";
import { Card } from "antd";
import { ProfileOutlined } from "@ant-design/icons";
import { Area } from "@ant-design/plots";

const DashboardTotalCountCard = () => {
  const config = {
    data: [
      {
        index: 1,
        value: 1000,
      },
      {
        index: 2,
        value: 3000,
      },
      {
        index: 3,
        value: 2000,
      },
      {
        index: 4,
        value: 500,
      },
      {
        index: 5,
        value: 1000,
      },
      {
        index: 6,
        value: 4000,
      },
      {
        index: 7,
        value: 4500,
      },
    ],
    xField: "index",
    yField: "value",
    padding: 0,
    syncViewPadding: true,
    tooltip: false,
    animation: false,
    xAxis: false,
    yAxis: {
      label: {
        style: {
          stroke: "transparent",
        },
      },
      grid: {
        line: {
          style: {
            stroke: "transparent",
          },
        },
      },
    },
    smooth: true,
    line: {
      color: "green",
    },
  };
  return (
    <Card
      style={{
        height: "102px",
        padding: "0 0 8px 0",
      }}
      size="small"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          whiteSpace: "nowrap",
        }}
      >
        <ProfileOutlined />
        <p
          style={{
            marginLeft: "8px",
          }}
        >
          Number of profiles
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            fontSize: "42px",
            fontWeight: "bold",
            flex: 1,
            whiteSpace: "nowrap",
            textAlign: "start",
            marginLeft: "48px",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          34
        </p>

        <Area {...config} style={{ width: "50%", height: "48px" }} />
      </div>
    </Card>
  );
};

export default DashboardTotalCountCard;
