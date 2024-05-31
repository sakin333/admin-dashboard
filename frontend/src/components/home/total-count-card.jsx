import React from "react";
import { Card } from "antd";
import { ProfileOutlined } from "@ant-design/icons";
import { Area, Pie } from "@ant-design/plots";

const DashboardTotalCountCard = ({ title, icon, total, data }) => {
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    innerRadius: 0.6,
    legend: false,
    tooltip: true,
    label: false,
    statistic: {
      title: false,
      content: {
        style: {
          fontSize: "12px",
          fontWeight: "bold",
        },
        formatter: () => `${total}`,
      },
    },
    pieStyle: {
      stroke: null,
    },
    color: ({ type }) => {
      if (type === "Profiles") return "#1890ff";
      if (type === "Companies") return "#52c41a";
      if (type === "Deals Won") return "#faad14";
      return "rgba(0, 0, 0, 0.1)";
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
        {icon}
        <p
          style={{
            marginLeft: "8px",
          }}
        >
          {title}
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
          {total}
        </p>

        <Pie
          {...config}
          style={{ width: "60%", height: "100px", marginTop: "-34px" }}
        />
      </div>
    </Card>
  );
};

export default DashboardTotalCountCard;
