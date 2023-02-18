import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Select, SelectOption } from "./Select";
import { Event } from "react-big-calendar";
import useBookings from "../hooks/useBookings";

const bookingStatusOptions = [
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const bookingRoomOptions = [
  { label: "Discussion", value: "DISCUSSION ROOM" },
  { label: "Meeting", value: "MEETING ROOM" },
  { label: "Conference", value: "CONFERENCE ROOM" },
];

type FilterProps = {
  setFilteredBookings: (filteredBookings: Event[] | []) => void;
};

function Filter({ setFilteredBookings }: FilterProps) {
  const [statuses, setStatuses] = useState<SelectOption[]>([bookingStatusOptions[0]]);
  const [rooms, setRooms] = useState<SelectOption[]>(bookingRoomOptions);
  const { bookings } = useBookings();

  useEffect(() => {
    if (bookings.length) {
      const roomsValues = rooms.map((room) => room.value);
      const statusesValues = statuses.map((status) => status.value);

      setFilteredBookings(
        bookings.filter(
          (booking) => roomsValues.includes(booking.resource.type) && statusesValues.includes(booking.resource.status)
        )
      );
      console.log("set filtered bookings");
    }
  }, [bookings, statuses, rooms]);

  return (
    <>
      <Row>
        <Col className="d-flex align-items-center mx-2" md={1}>
          <label>Status: </label>
        </Col>
        <Col>
          <Select options={bookingStatusOptions} value={statuses} onChange={(o) => setStatuses(o)} />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="d-flex align-items-center mx-2" md={1}>
          <label>Room: </label>
        </Col>
        <Col>
          <Select options={bookingRoomOptions} value={rooms} onChange={(o) => setRooms(o)} />
        </Col>
      </Row>
    </>
  );
}

export default Filter;
