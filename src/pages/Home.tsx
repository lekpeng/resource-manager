import Filter from "../components/Filter";
import Switch from "react-switch";
import { capitaliseFirstLetter } from "../utils/converters";
import { useState } from "react";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { Calendar as BigCalendar, dateFnsLocalizer, Event, EventPropGetter, ToolbarProps, View, NavigateAction } from "react-big-calendar";
import { Calendar, Detail } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Col, Row, Modal } from "react-bootstrap";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./Home.module.css";

function Home() {
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

  const CustomToolbar = ({ label, onView, onNavigate }: ToolbarProps) => {
    const [showCalendar, setShowCalendar] = useState(false);

    const handleClose = () => setShowCalendar(false);
    const handleShow = () => setShowCalendar(true);

    const navigateButtonOptions: NavigateAction[] = ["TODAY", "PREV", "NEXT"];
    const viewButtonOptions: View[] = ["month", "week", "day", "agenda"];

    return (
      <Row className="rbc-toolbar">
        <Col className="rbc-btn-group">
          {navigateButtonOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onNavigate(option)}
              className="rbc-btn-group btn btn-default"
              style={{ margin: 0 }}>
              {capitaliseFirstLetter(option)}
            </button>
          ))}
        </Col>

        <Col md="auto" className="d-flex justify-content-center">
          <span className={`rbc-toolbar-label ${styles["date-label"]}`} onClick={handleShow}>
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
          <Row>
            <Col className="d-flex justify-content-end align-items-center">
              <Switch
                onChange={() => {
                  if (weekType === "week") {
                    setWeekType("work_week");
                    onView("work_week");
                  } else {
                    setWeekType("week");
                    onView("week");
                  }
                }}
                checked={weekType === "week"}
                onColor="#ffdd86"
                onHandleColor="#ff8c00"
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
              <p className={`${styles["week-type"]}`}>
                {weekType === "week" ? "Hide" : "Show"} <span>weekends </span>
              </p>
            </Col>

            <Col className="rbc-btn-group">
              {viewButtonOptions.map((option) => (
                <button
                  type="button"
                  key={option}
                  className="rbc-btn-group btn btn-default"
                  onClick={() => {
                    if (option === "week") onView(weekType);
                    else onView(option);
                  }}
                  style={{ margin: 0 }}>
                  {capitaliseFirstLetter(option)}
                </button>
              ))}
            </Col>
          </Row>
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
    <>
      <Row className="mt-3" style={{ height: "10em" }}>
        <Col>
          <Filter setFilteredBookings={setFilteredBookings} />
        </Col>
        <Col className="d-flex justify-content-center m-3" md="auto">
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
        style={{ height: "calc(100vh - 12em)" }}
        components={{
          toolbar: CustomToolbar,
        }}
        onNavigate={handleNavigate}
        onView={handleView}
      />
    </>
  );
}

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
