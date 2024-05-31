import React, { useEffect, useMemo } from "react";
import { Card } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import { Area } from "@ant-design/plots";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeals } from "../../redux/actions/dealAction";
import { mapDealsData } from "../../utils/deals";

const DealsCharts = () => {
  const deals = useSelector((state) => state.deal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);

  const dealData = useMemo(() => {
    return mapDealsData(deals.deals?.data);
  }, [deals.deals?.data]);

  const config = {
    data: dealData,
    xField: "timeText",
    yField: "value",
    isStack: false,
    seriesField: "state",
    animation: true,
    startOnZero: false,
    smooth: true,
    legend: {
      offsetY: -8,
    },
    yAxis: {
      label: {
        formatter: (v) => {
          return `$${Number(v) / 1000}k`;
        },
      },
    },
    tooltip: {
      formatter: (data) => {
        return {
          name: data.state,
          value: `$${Number(data.value) / 1000}k`,
        };
      },
    },
  };

  return (
    <Card
      style={{
        height: "100%",
      }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <DollarOutlined />
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginLeft: "8px",
            }}
          >
            Deals
          </p>
        </div>
      }
    >
      <Area {...config} height={325} />
    </Card>
  );
};

export default DealsCharts;
