import { Event } from "react-big-calendar";
import { Booking } from "../Types";

export const bookingToEventConverter = (booking: Booking): Event => {
  return {
    title: booking.name,
    start: new Date(`${booking.date}T${booking.start_time}`),
    end: new Date(`${booking.date}T${booking.end_time}`),
    resource: { type: booking.type, status: booking.status },
  };
};
