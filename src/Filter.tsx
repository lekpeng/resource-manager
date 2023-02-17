import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const Filter = () => {
  return (
    <Container>
      <Form style={{ display: "flex" }}>
        <Form.Label style={{ marginRight: "1em" }}>Booking: </Form.Label>
        <Form.Check type="checkbox" label="Confirmed" style={{ marginRight: "1em" }} />
        <Form.Check type="checkbox" label="Cancelled" />
      </Form>
      <Form style={{ display: "flex" }}>
        <Form.Label style={{ marginRight: "1em" }}>Room Type: </Form.Label>
        <Form.Check type="checkbox" label="Discussion" style={{ marginRight: "1em" }} />
        <Form.Check type="checkbox" label="Meeting" style={{ marginRight: "1em" }} />
        <Form.Check type="checkbox" label="Conference" />
      </Form>
    </Container>
  );
};

export default Filter;
