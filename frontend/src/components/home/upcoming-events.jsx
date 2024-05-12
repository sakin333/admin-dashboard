import React, { useState, useEffect } from "react";
import { Badge, Card, List, Pagination } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import UpcomingEventsSkeleton from "../skeleton/upcoming-events";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../redux/actions/eventAction";
import { renderDate } from "../../utils/dateFormat";
import { ellipsis } from "../../utils/ellipsis";

const UpcomingEvents = () => {
  const [eventsData, setEventsData] = useState();

  const events = useSelector((state) => state.event);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
    setEventsData(events.events.data);
  }, []);

  return (
    <Card
      style={{
        height: "100%",
        overflowY: "scroll",
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
      {events.loading ? (
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
          dataSource={
            events.events?.data.sort(
              (a, b) => new Date(a.startDate) - new Date(b.startDate)
            ) ?? []
          }
          renderItem={(item) => {
            return (
              <List.Item>
                <List.Item.Meta
                  avatar={<Badge color={item.color} />}
                  title={<p>{renderDate(item.startDate, item.endDate)}</p>}
                  description={<strong>{ellipsis(item.title)}</strong>}
                />
              </List.Item>
            );
          }}
        ></List>
      )}

      {!events.loading && events.events?.data?.length === 0 && <NoEvent />}
    </Card>
  );
};

const NoEvent = () => (
  <span
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "220px",
    }}
  >
    No Upcoming Event
  </span>
);

export default UpcomingEvents;
