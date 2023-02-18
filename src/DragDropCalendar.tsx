import Filter from "./Filter";
import { bookingToEventConverter } from "./utils/bookingToEventConverter";

import { useState, useEffect } from "react";
import useBookings from "./hooks/useBookings";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

import { Col, Row } from "react-bootstrap";
import { Calendar, dateFnsLocalizer, Event, EventPropGetter } from "react-big-calendar";
import withDragAndDrop, { withDragAndDropProps } from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const DragDropCalendar = () => {
  const { bookings } = useBookings();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const allEvents = bookings.map(bookingToEventConverter);
    setEvents(allEvents);
  }, []);

  const eventStyleGetter: EventPropGetter<Event> = (event) => {
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
    <>
      <Row style={{ height: "6em" }}>
        <Col style={{ display: "flex", alignItems: "center" }}>
          <Filter setEvents={setEvents} />
        </Col>
        <Col style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
        style={{ height: "calc(100vh - 6em)" }}
      />
    </>
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
