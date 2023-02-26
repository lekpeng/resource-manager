import Home from "./pages/Home";
import BookingDetails from "./pages/BookingDetails";
import Basic from "./pages/Basic";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { BookingsContext } from "./contexts/BookingsContext";
import { Event } from "react-big-calendar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

function App() {
  const [bookings, setBookings] = useState<Event[]>([]);

  return (
    <div className="App">
      <BookingsContext.Provider value={{ bookings, setBookings }}>
        <Container fluid className="w-100 p-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/basic" element={<Basic />} />
            <Route path="/:uuid" element={<BookingDetails />} />
          </Routes>
        </Container>
      </BookingsContext.Provider>
    </div>
  );
}

export default App;
