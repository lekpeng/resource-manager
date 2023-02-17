import Form from "react-bootstrap/Form";

const Filter = () => {
  return (
    <Form style={{ display: "flex" }}>
      <Form.Check type="checkbox" label="Confirmed Bookings" style={{ marginRight: "1em" }} />
      <Form.Check type="checkbox" label="Cancelled Bookings" />
    </Form>
  );
};

export default Filter;
