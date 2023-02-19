import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { BookingsContext } from "./contexts/BookingsContext";
import DragDropCalendar from "./pages/DragDropCalendar";
import { Event } from "react-big-calendar";

import "bootstrap/dist/css/bootstrap.min.css";
import MockCalendar from "./pages/MockCalendar";

function App() {
  // const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookings, setBookings] = useState<Event[]>([]);

  return (
    <div className="App">
      <BookingsContext.Provider value={{ bookings, setBookings }}>
        <Routes>
          <Route path="/" element={<DragDropCalendar />} />
          <Route path="/Mock" element={<MockCalendar />} />
          <Route path="/:uuid" element={<DragDropCalendar />} />
        </Routes>
      </BookingsContext.Provider>
    </div>
  );
}

export default App;
