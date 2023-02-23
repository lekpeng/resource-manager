import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Event } from "react-big-calendar";
import useBookings from "../hooks/useBookings";
import { dateOnly, timeOnly } from "../utils/converters";

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
  const { uuid, user_uuid, code, type, status } = bookingDetails?.resource || {};

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{status}</Card.Text>
          <Card.Text>Date: {dateOnly(start)}</Card.Text>
          <Card.Text>Time: {`${timeOnly(start)} - ${timeOnly(end)}`}</Card.Text>
          <Card.Text>Booking User ID: {user_uuid}</Card.Text>
          <Card.Text>Type: {type}</Card.Text>
          <Card.Text>Code: {code}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default BookingDetails;
