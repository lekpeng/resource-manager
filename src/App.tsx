import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { BookingsContext } from "./contexts/BookingsContext";
import DragDropCalendar from "./DragDropCalendar";
import { Booking } from "./Types";

function App() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  return (
    <div className="App">
      <BookingsContext.Provider value={{ bookings, setBookings }}>
        <Routes>
          <Route path="/" element={<DragDropCalendar />} />
          <Route path="/:uuid" element={<DragDropCalendar />} />
        </Routes>
      </BookingsContext.Provider>
    </div>
  );
}

export default App;
