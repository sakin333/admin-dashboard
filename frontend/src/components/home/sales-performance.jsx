import { Column } from "@ant-design/plots";
import { Card } from "antd";
import React from "react";

const SalesPerformanceCard = ({ data }) => {
  const config = {
    data: data.reduce(
      (acc, cur) => [
        ...acc,
        ...cur.sales.map((s) => ({ ...s, product: cur.product })),
      ],
      []
    ),
    xField: "month",
    yField: "salesAmount",
    seriesField: "product",
    legend: { position: "top" },
    tooltip: { shared: true },
    label: {
      position: "middle",
      layout: [{ type: "interval-adjust-position" }],
    },
  };
  return (
    <Card
      title="Sales Performance"
      style={{
        height: "460px",
        padding: "0 0 8px 0",
      }}
    >
      <Column {...config} height={360} />
    </Card>
  );
};

export default SalesPerformanceCard;
