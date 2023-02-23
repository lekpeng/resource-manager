import { Event } from "react-big-calendar";
import { csvBooking } from "../Types";
import { format } from "date-fns";

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

export const lowercase = (str?: String): String => {
  if (!str) {
    return "";
  }
  return str.toLowerCase();
};

export const capitaliseFirstLetter = (str?: String): String => {
  if (!str) {
    return "";
  }
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const dateOnly = (date?: Date): String => {
  if (!date) {
    return "";
  }
  return format(date, "d MMM yyyy");
};

export const timeOnly = (date?: Date): String => {
  if (!date) {
    return "";
  }
  return format(date, "h:mm a");
};
