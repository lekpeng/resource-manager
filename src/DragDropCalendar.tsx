import { Booking } from "./Types";
import Filter from "./Filter";

import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer, Event, EventPropGetter } from "react-big-calendar";
import withDragAndDrop, { withDragAndDropProps } from "react-big-calendar/lib/addons/dragAndDrop";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import addHours from "date-fns/addHours";
import startOfHour from "date-fns/startOfHour";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Col, Container, Row } from "react-bootstrap";

type DragDropCalendarProps = {
  data: Booking[];
};

const DragDropCalendar = ({ data }: DragDropCalendarProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    const allEvents = data.map((booking) => {
      return {
        title: booking.name,
        start: new Date(`${booking.date}T${booking.start_time}`),
        end: new Date(`${booking.date}T${booking.end_time}`),
        resource: { type: booking.type, status: booking.status },
      };
    });

    setEvents(allEvents);
  }, [data]);

  const eventStyleGetter: EventPropGetter<Event> = (event, start, end, isSelected) => {
    let backgroundColor;
    let textDecoration = "none";
    if (event.resource.status === "CANCELLED") {
      textDecoration = "line-through";
    }
    switch (event.resource.type) {
      case "DISCUSSION ROOM":
        backgroundColor = "mediumseagreen";
        break;
      case "MEETING ROOM":
        backgroundColor = "royalblue";
        break;

      case "CONFERENCE ROOM":
        backgroundColor = "coral";
        break;

      default:
        backgroundColor = "black";
    }

    const style = {
      backgroundColor,
      textDecoration,
    };
    return {
      style,
    };
  };

  const onEventResize: withDragAndDropProps["onEventResize"] = (data) => {
    const { start, end } = data;

    setEvents((currentEvents) => {
      const firstEvent = {
        start: new Date(start),
        end: new Date(end),
      };
      return [...currentEvents, firstEvent];
    });
  };

  const onEventDrop: withDragAndDropProps["onEventDrop"] = (data) => {
    console.log(data);
  };

  return (
    // <Container style={{ height: "100vh" }}>
    <Container>
      <Row>
        <Col style={{ display: "flex", alignItems: "center", height: "3em" }}>
          <Filter />
        </Col>
        <Col style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "3em" }}>
          <h3>Resource Manager </h3>
        </Col>
        <Col></Col>
      </Row>
      <DnDCalendar
        defaultView="month"
        events={events}
        eventPropGetter={eventStyleGetter}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        style={{ height: "calc(100vh - 3em)" }}
      />
    </Container>
  );
};

const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const DnDCalendar = withDragAndDrop(Calendar);

export default DragDropCalendar;
