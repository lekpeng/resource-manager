import Filter from "../components/Filter";
import Switch from "react-switch";

import { useState } from "react";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";

import { Col, Row, Modal } from "react-bootstrap";
import { Calendar as BigCalendar, dateFnsLocalizer, Event, EventPropGetter, ToolbarProps, View } from "react-big-calendar";
import { Calendar, Detail } from "react-calendar";
import "react-calendar/dist/Calendar.css";

import "react-big-calendar/lib/css/react-big-calendar.css";

const Home = () => {
  const [filteredBookings, setFilteredBookings] = useState<Event[]>([]);
  const [calendarValue, setCalendarValue] = useState<Date>(new Date());
  const [calendarView, setCalendarView] = useState<Detail>("year");
  const [weekType, setWeekType] = useState<View>("work_week");

  const handleNavigate = (date: Date): void => {
    setCalendarValue(date);
  };

  const handleView = (view: View): void => {
    if (view === "month") setCalendarView("year");
    else setCalendarView("month");
  };

  const CustomToolbar: React.FC<ToolbarProps> = ({ label, onView, onNavigate }) => {
    const [showCalendar, setShowCalendar] = useState(false);

    const handleClose = () => setShowCalendar(false);
    const handleShow = () => setShowCalendar(true);

    return (
      <Row className="rbc-toolbar">
        <Col className="rbc-btn-group">
          <button type="button" onClick={() => onNavigate("TODAY")} className="rbc-btn-group btn btn-default">
            Today
          </button>
          <button
            style={{ margin: 0 }}
            type="button"
            onClick={() => {
              onNavigate("PREV");
            }}
            className="rbc-btn-group btn btn-default">
            Back
          </button>
          <button
            style={{ margin: 0 }}
            type="button"
            onClick={() => {
              onNavigate("NEXT");
            }}
            className="rbc-btn-group btn btn-default">
            Next
          </button>
        </Col>

        <Col></Col>
        <Col className="d-flex justify-content-center">
          <span className="rbc-toolbar-label" style={{ color: "maroon", cursor: "pointer", fontWeight: "bold" }} onClick={handleShow}>
            {label}
          </span>

          <Modal show={showCalendar} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Navigate to a date</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center">
              <Calendar
                defaultView={calendarView}
                defaultValue={calendarValue}
                onClickMonth={(date: Date) => {
                  if (calendarView === "year") {
                    onNavigate("DATE", date);
                  }
                }}
                onChange={(date: Date) => {
                  // this line navigates to the selected date in the big calendar
                  onNavigate("DATE", date);
                  handleClose();
                }}
              />
            </Modal.Body>
          </Modal>
        </Col>
        <Col>
          <div style={{ display: "flex" }}>
            <Switch
              onChange={() => {
                if (weekType === "week") {
                  setWeekType("work_week");
                  onView("work_week");
                } else {
                  console.log("else");
                  setWeekType("week");
                  onView("week");
                }
              }}
              checked={weekType === "week"}
              onColor="#ffdd86"
              onHandleColor="#e69c26"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch"
              id="material-switch"
            />
            <p>
              {weekType === "week" ? "Show" : "Hide"} <span>weekends </span>
            </p>
          </div>
        </Col>

        <Col className="d-flex rbc-btn-group" style={{ justifyContent: "right" }}>
          <button type="button" onClick={() => onView("month")} className="rbc-btn-group btn btn-default">
            Month
          </button>
          <button style={{ margin: 0 }} type="button" onClick={() => onView(weekType)} className="rbc-btn-group btn btn-default">
            Week
          </button>
          <button style={{ margin: 0 }} type="button" onClick={() => onView("day")} className="rbc-btn-group btn btn-default">
            Day
          </button>
          <button style={{ margin: 0 }} type="button" onClick={() => onView("agenda")} className="rbc-btn-group btn btn-default">
            Agenda
          </button>
        </Col>
      </Row>
    );
  };

  const slotGroupStyleGetter = () => {
    const style = {
      minHeight: "100px",
    };
    return {
      style,
    };
  };
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
        backgroundColor = "cornflowerblue";
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
      fontSize: "0.8em",
    };
    return {
      style,
    };
  };
  return (
    <div style={{ marginTop: "1em" }}>
      <Row style={{ height: "10em" }}>
        <Col>
          <Filter setFilteredBookings={setFilteredBookings} />
        </Col>
        <Col className="m-3" md="auto" style={{ display: "flex", justifyContent: "center" }}>
          <h4>Resource Manager </h4>
        </Col>
        <Col className="d-flex justify-content-center align-items-center"></Col>
      </Row>
      <BigCalendar
        defaultView="month"
        views={["day", "agenda", "week", "work_week", "month"]}
        events={filteredBookings}
        eventPropGetter={eventStyleGetter}
        slotGroupPropGetter={slotGroupStyleGetter}
        localizer={localizer}
        style={{ height: "calc(100vh - 11em)" }}
        components={{
          toolbar: CustomToolbar,
        }}
        onNavigate={handleNavigate}
        onView={handleView}
      />
    </div>
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

export default Home;
