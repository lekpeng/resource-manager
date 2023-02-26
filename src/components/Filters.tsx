import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Select, SelectOption } from "./Select";
import { Event } from "react-big-calendar";
import useBookings from "../hooks/useBookings";

import styles from "./filter.module.css";
import { optionsToValues } from "../utils/converters";

const statusOptions = [
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const roomOptions = [
  { label: "Discussion", value: "DISCUSSION ROOM" },
  { label: "Meeting", value: "MEETING ROOM" },
  { label: "Conference", value: "CONFERENCE ROOM" },
];

const brandOptions = [
  { label: "ITCD", value: "ITCD" },
  { label: "CoLab", value: "COLAB" },
];

type FilterProps = {
  label: String;
  value: SelectOption[];
  options: SelectOption[];
  onChange: (options: SelectOption[]) => void;
};

function Filter({ label, value, options, onChange }: FilterProps) {
  return (
    <Row className="mb-2">
      <Col className="d-flex align-items-center">
        <label className={styles["filter-label"]}>{label}: </label>
        <Select options={options} value={value} onChange={onChange} />
      </Col>
    </Row>
  );
}

type FiltersProps = {
  setFilteredBookings: (filteredBookings: Event[] | []) => void;
};

function Filters({ setFilteredBookings }: FiltersProps) {
  const [statuses, setStatuses] = useState<SelectOption[]>([statusOptions[0]]);
  const [rooms, setRooms] = useState<SelectOption[]>(roomOptions);
  const [brands, setBrands] = useState<SelectOption[]>(brandOptions);
  const { bookings } = useBookings();

  useEffect(() => {
    if (bookings.length) {
      const roomsValues = optionsToValues(rooms);
      const statusesValues = optionsToValues(statuses);
      const brandsValues = optionsToValues(brands);

      setFilteredBookings(
        bookings.filter((booking) => {
          return (
            roomsValues.includes(booking.resource.type) &&
            statusesValues.includes(booking.resource.status) &&
            brandsValues.some((brand) => booking.resource.code.includes(brand))
          );
        })
      );
    }
  }, [bookings, statuses, rooms, brands]);

  return (
    <>
      <Filter label="Status" value={statuses} options={statusOptions} onChange={(o) => setStatuses(o)} />
      <Filter label="Room" value={rooms} options={roomOptions} onChange={(o) => setRooms(o)} />
      <Filter label="Brand" value={brands} options={brandOptions} onChange={(o) => setBrands(o)} />
    </>
  );
}

export default Filters;
