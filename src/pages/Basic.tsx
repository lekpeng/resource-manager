import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";

function Basic() {
  return (
    <>
      <h4>Resource Manager</h4>
      <BigCalendar
        defaultView="month"
        views={["day", "agenda", "week", "work_week", "month"]}
        events={[]}
        localizer={localizer}
        style={{ height: "calc(100vh - 12em)" }}
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

export default Basic;
