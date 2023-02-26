import Filter from "../components/Filter";
import Switch from "react-switch";
import { capitaliseFirstLetter } from "../utils/converters";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { Calendar as BigCalendar, dateFnsLocalizer, Event, ToolbarProps, View, NavigateAction } from "react-big-calendar";
import { Calendar, Detail } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Col, Row, Modal, Container } from "react-bootstrap";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./home.module.css";

function Home() {
  const [filteredBookings, setFilteredBookings] = useState<Event[]>([]);
  const [calendarValue, setCalendarValue] = useState<Date>(new Date());
  const [calendarView, setCalendarView] = useState<Detail>("year");
  const [weekType, setWeekType] = useState<View>("work_week");
  const [showSwitch, setShowSwitch] = useState(false);

  const navigate = useNavigate();

  const handleNavigate = (date: Date): void => {
    setCalendarValue(date);
  };

  const handleView = (view: View): void => {
    if (view === "month") {
      setCalendarView("year");
      setShowSwitch(false);
    } else if (view === "week" || view === "work_week") {
      setCalendarView("month");
      setShowSwitch(true);
    } else {
      setCalendarView("month");
      setShowSwitch(false);
    }
  };

  const handleSelectEvent = (event: Event) => {
    navigate(`/${event.resource.uuid}`);
  };

  const slotGroupPropGetter = () => {
    const style = {
      minHeight: "100px",
    };
    return {
      style,
    };
  };

  const eventPropGetter = (event: Event) => {
    let backgroundColor;
    let textDecoration = "none";
    if (event.resource.status === "CANCELLED") {
      textDecoration = "line-through";
    }
    switch (event.resource.type) {
      case "DISCUSSION ROOM":
        backgroundColor = "darkorange";
        break;
      case "MEETING ROOM":
        backgroundColor = "cornflowerblue";
        break;

      case "CONFERENCE ROOM":
        backgroundColor = "mediumpurple";
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

  const CustomToolbar = ({ label, onView, onNavigate }: ToolbarProps) => {
    const [showCalendar, setShowCalendar] = useState(false);

    const handleClose = () => setShowCalendar(false);
    const handleShow = () => setShowCalendar(true);

    const navigateButtonOptions: NavigateAction[] = ["TODAY", "PREV", "NEXT"];
    const viewButtonOptions: View[] = ["month", "week", "day", "agenda"];

    return (
      <Row className="rbc-toolbar">
        <Col className="rbc-btn-group">
          {navigateButtonOptions.map((option, idx) => {
            const buttonStyle = idx === 0 ? { margin: 0 } : { margin: 0, borderLeft: "none" };

            return (
              <button
                key={option}
                type="button"
                onClick={() => onNavigate(option)}
                className="rbc-btn-group btn btn-default"
                style={buttonStyle}>
                {capitaliseFirstLetter(option)}
              </button>
            );
          })}
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
              {showSwitch && (
                <>
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
                    onColor="#788692"
                    onHandleColor="#3f586c"
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
                    {weekType === "week" ? "Show" : "Hide"} <span>weekends </span>
                  </p>
                </>
              )}
            </Col>

            <Col className="rbc-btn-group d-flex justify-content-end">
              {viewButtonOptions.map((option, idx) => {
                const buttonStyle = idx === viewButtonOptions.length - 1 ? { margin: 0 } : { margin: 0, borderRight: "none" };

                return (
                  <button
                    type="button"
                    key={option}
                    className="rbc-btn-group btn btn-default"
                    onClick={() => {
                      if (option === "week") onView(weekType);
                      else onView(option);
                    }}
                    style={buttonStyle}>
                    {capitaliseFirstLetter(option)}
                  </button>
                );
              })}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  return (
    <Container className="d-flex flex-column justify-content-center">
      <Row className="mt-1" style={{ alignSelf: "center", width: "100%", minHeight: "10em" }}>
        <Col className="d-flex flex-column justify-content-center ps-0">
          <Filter setFilteredBookings={setFilteredBookings} />
        </Col>
        <Col className="d-flex justify-content-center align-items-center" md="auto">
          <h4 className={styles["title"]}>RESOURCE MANAGER </h4>
        </Col>
        <Col className="d-flex justify-content-center align-items-center"></Col>
      </Row>
      <BigCalendar
        defaultView="month"
        views={["day", "agenda", "week", "work_week", "month"]}
        events={filteredBookings}
        eventPropGetter={eventPropGetter}
        slotGroupPropGetter={slotGroupPropGetter}
        localizer={localizer}
        style={{ minHeight: "calc(100vh - 12em)", width: "100%" }}
        components={{
          toolbar: CustomToolbar,
        }}
        onNavigate={handleNavigate}
        onView={handleView}
        onSelectEvent={handleSelectEvent}
      />
    </Container>
  );
}

const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

export default Home;
