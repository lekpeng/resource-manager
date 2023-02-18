import { createContext } from "react";
import { Booking } from "../Types";

export interface IBookingsContext {
  bookings: Booking[];
  setBookings: (bookings: Booking[]) => void;
}

export const BookingsContext = createContext<IBookingsContext>({ bookings: [], setBookings: () => {} });
