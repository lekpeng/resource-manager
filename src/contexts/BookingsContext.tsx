import { createContext } from "react";
import { Event } from "react-big-calendar";

export interface IBookingsContext {
  bookings: Event[];
  setBookings: (bookings: Event[]) => void;
}

export const BookingsContext = createContext<IBookingsContext>({ bookings: [], setBookings: () => {} });
