import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Event } from "react-big-calendar";
import useBookings from "../hooks/useBookings";
import { capitaliseFirstLetter, lowercase, dateOnly, timeOnly } from "../utils/converters";
import styles from "./booking-details.module.css";
import Detail from "../components/Detail";

function BookingDetails() {
  const params = useParams();
  const { bookings } = useBookings();
  const [bookingDetails, setBookingDetails] = useState<Event>();

  useEffect(() => {
    if (bookings.length) {
      setBookingDetails(bookings.find((booking) => booking.resource.uuid === params.uuid));
    }
  }, [params.uuid, bookings]);

  const { title, start, end } = bookingDetails || {};
  const { user_uuid, code, type, status } = bookingDetails?.resource || {};

  return (
    <Container fluid style={{ height: "100vh", backgroundColor: "#3F586C" }}>
      <Container style={{ height: "100vh", paddingLeft: "3em", paddingTop: "3em", maxWidth: "768px", backgroundColor: "white" }}>
        <h4 className="d-flex justify-content-center mb-5">
          {`${title}`} <span className={`${styles["status"]} ${styles[`${lowercase(status)}`]}`}>[{status}]</span>
        </h4>
        <Detail header="Date" information={dateOnly(start)} />
        <Detail header="Time" information={`${timeOnly(start)} - ${timeOnly(end)}`} />
        <Detail header="Booking User ID" information={user_uuid} />
        <Detail header="Type" information={capitaliseFirstLetter(type)} />
        <Detail header="Code" information={code} />
      </Container>
    </Container>
  );
}

export default BookingDetails;
