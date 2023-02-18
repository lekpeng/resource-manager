import { createContext } from "react";
// import { Booking } from "../Types";
import { Event } from "react-big-calendar";

// export interface IBookingsContext {
//   bookings: Booking[];
//   setBookings: (bookings: Booking[]) => void;
// }

export interface IBookingsContext {
  bookings: Event[];
  setBookings: (bookings: Event[]) => void;
}

export const BookingsContext = createContext<IBookingsContext>({ bookings: [], setBookings: () => {} });
