import { useState } from "react";
import { ToolbarProps, dateFnsLocalizer } from "react-big-calendar";
import { Calendar as BigCalendar } from "react-big-calendar";

import { Calendar } from "react-calendar";
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
      {showCalendar && (
        <Calendar
          onChange={(date: Date) => {
            onNavigate("DATE", date);
            setShowCalendar(false);
          }}
        />
      )}
      <span className="rbc-btn-group">
        <button type="button" onClick={() => onView("month")} className="rbc-btn-group btn btn-default">
          Month
        </button>
        <button style={{ margin: 0 }} type="button" onClick={() => onView("week")} className="rbc-btn-group btn btn-default">
          Week
        </button>
        <button style={{ margin: 0 }} type="button" onClick={() => onView("day")} className="rbc-btn-group btn btn-default">
          Day
        </button>
        <button style={{ margin: 0 }} type="button" onClick={() => onView("agenda")} className="rbc-btn-group btn btn-default">
          Agenda
        </button>
      </span>
    </div>
  );
};

const MyCalendar = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleCalendarClose = () => {
    setShowCalendar(false);
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
      />
      {showCalendar && (
        <Calendar
          onChange={(date: Date) => {
            setSelectedDate(date);
            handleCalendarClose();
          }}
          value={selectedDate}
        />
      )}
    </div>
  );
};

export default MyCalendar;
