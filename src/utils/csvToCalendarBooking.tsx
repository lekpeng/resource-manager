import { Event } from "react-big-calendar";
import { csvBooking } from "../Types";

export const csvToCalendarBookingConverter = (csvBooking: csvBooking): Event => {
  return {
    title: csvBooking.name,
    start: new Date(`${csvBooking.date}T${csvBooking.start_time}`),
    end: new Date(`${csvBooking.date}T${csvBooking.end_time}`),
    resource: {
      uuid: csvBooking.uuid,
      user_uuid: csvBooking.user_uuid,
      code: csvBooking.code,
      type: csvBooking.type,
      status: csvBooking.status,
    },
  };
};