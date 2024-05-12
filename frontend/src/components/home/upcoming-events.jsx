import React, { useState } from "react";
import { Badge, Card, List } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import UpcomingEventsSkeleton from "../skeleton/upcoming-events";

const UpcomingEvents = () => {
  const [isLoading, setIsLoading] = useState(false);
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
          <CalendarOutlined />
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginLeft: "8px",
            }}
          >
            Upcoming Events
          </p>
        </div>
      }
    >
      {isLoading ? (
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, index) => ({
            id: index,
          }))}
          renderItem={() => <UpcomingEventsSkeleton />}
        />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={[]}
          renderItem={(item) => {
            return (
              <List.Item>
                <List.Item.Meta
                  avatar={<Badge color={item.color} />}
                  title={<p>date</p>}
                  description={<p>{item.title}</p>}
                />
              </List.Item>
            );
          }}
        ></List>
      )}
    </Card>
  );
};

export default UpcomingEvents;
