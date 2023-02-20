import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { BookingsContext } from "./contexts/BookingsContext";
import Home from "./pages/Home";
import { Event } from "react-big-calendar";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [bookings, setBookings] = useState<Event[]>([]);

  return (
    <div className="App">
      <BookingsContext.Provider value={{ bookings, setBookings }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:uuid" element={<Home />} />
        </Routes>
      </BookingsContext.Provider>
    </div>
  );
}

export default App;
