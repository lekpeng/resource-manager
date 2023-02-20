import { useState } from "react";
import { ToolbarProps, dateFnsLocalizer, View } from "react-big-calendar";
import { Calendar as BigCalendar } from "react-big-calendar";
import { Calendar, Detail } from "react-calendar";

import Modal from "react-bootstrap/Modal";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-calendar/dist/Calendar.css";

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

const MyCalendar = () => {
  const [calendarValue, setCalendarValue] = useState<Date>(new Date());
  const [calendarView, setCalendarView] = useState<Detail>("year");

  const handleNavigate = (date: Date): void => {
    setCalendarValue(date);
  };

  const handleView = (view: View): void => {
    if (view === "month") setCalendarView("year");
    else setCalendarView("month");
  };

  const MyToolbar: React.FC<ToolbarProps> = ({ label, onView, onNavigate }) => {
    const [showCalendar, setShowCalendar] = useState(false);

    const handleClose = () => setShowCalendar(false);
    const handleShow = () => setShowCalendar(true);

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
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
        </span>

        <span className="rbc-toolbar-label" style={{ cursor: "pointer" }} onClick={handleShow}>
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
                console.log("CHANGED");
                // this line navigates to the selected date in the big calendar
                onNavigate("DATE", date);
                handleClose();
              }}
            />
          </Modal.Body>
        </Modal>

        <span className="rbc-btn-group">
          <button type="button" onClick={() => onView("month")} className="rbc-btn-group btn btn-default">
            Month
          </button>
          <button
            style={{ margin: 0 }}
            type="button"
            onClick={() => onView("week")}
            className="rbc-btn-group btn btn-default">
            Week
          </button>
          <button
            style={{ margin: 0 }}
            type="button"
            onClick={() => onView("day")}
            className="rbc-btn-group btn btn-default">
            Day
          </button>
          <button
            style={{ margin: 0 }}
            type="button"
            onClick={() => onView("agenda")}
            className="rbc-btn-group btn btn-default">
            Agenda
          </button>
        </span>
      </div>
    );
  };

  return (
    <div>
      <BigCalendar
        localizer={localizer}
        events={[]}
        views={["month", "week", "day", "agenda"]}
        defaultView="month"
        style={{ height: "calc(100vh - 8em)" }}
        components={{
          toolbar: MyToolbar,
        }}
        onNavigate={handleNavigate}
        onView={handleView}
      />
    </div>
  );
};

export default MyCalendar;
