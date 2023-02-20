import { useState } from "react";
import { ToolbarProps, dateFnsLocalizer } from "react-big-calendar";
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

const MyToolbar: React.FC<ToolbarProps> = ({ label, onView, onNavigate }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarView, setCalendarView] = useState<Detail>("year");

  const handleToolbarClick = () => {
    setShowCalendar((prevState) => !prevState);
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={() => onNavigate("TODAY")} className="rbc-btn-group btn btn-default">
          Today
        </button>
        <button style={{ margin: 0 }} type="button" onClick={() => onNavigate("PREV")} className="rbc-btn-group btn btn-default">
          Back
        </button>
        <button style={{ margin: 0 }} type="button" onClick={() => onNavigate("NEXT")} className="rbc-btn-group btn btn-default">
          Next
        </button>
      </span>

      <span className="rbc-toolbar-label" onClick={() => handleToolbarClick()}>
        {label}
      </span>

      <Modal show={showCalendar}>
        <Modal.Header closeButton>
          <Modal.Title>Navigate to a date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Calendar
            defaultView={calendarView}
            onChange={(date: Date) => {
              // this line navigates to the selected date in the big calendar
              onNavigate("DATE", date);
              setShowCalendar(false);
            }}
          />
        </Modal.Body>
      </Modal>

      <span className="rbc-btn-group">
        <button
          type="button"
          onClick={() => {
            setCalendarView("year");
            return onView("month");
          }}
          className="rbc-btn-group btn btn-default">
          Month
        </button>
        <button
          style={{ margin: 0 }}
          type="button"
          onClick={() => {
            setCalendarView("month");
            return onView("week");
          }}
          className="rbc-btn-group btn btn-default">
          Week
        </button>
        <button
          style={{ margin: 0 }}
          type="button"
          onClick={() => {
            setCalendarView("month");
            return onView("day");
          }}
          className="rbc-btn-group btn btn-default">
          Day
        </button>
        <button
          style={{ margin: 0 }}
          type="button"
          onClick={() => {
            setCalendarView("month");
            return onView("agenda");
          }}
          className="rbc-btn-group btn btn-default">
          Agenda
        </button>
      </span>
    </div>
  );
};

const MyCalendar = () => {
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
      />
    </div>
  );
};

export default MyCalendar;
