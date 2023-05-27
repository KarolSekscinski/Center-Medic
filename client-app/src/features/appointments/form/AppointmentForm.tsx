import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

interface Props {
  appointment: Appointment | undefined;
  closeForm: () => void;
  createOrEdit: (appointment: Appointment) => void;
  submitting: boolean;
}

export default function AppointmentForm({
  appointment: selectedAppointment,
  closeForm,
  createOrEdit,
  submitting,
}: Props) {
  const initialState = selectedAppointment ?? {
    id: "",
    description: "",
    patiendId: 0,
    doctorId: 0,
    dateOfIssue: "",
  };

  const [appointment, setAppointment] = useState(initialState);

  function handleSubmit() {
    createOrEdit(appointment);
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setAppointment({ ...appointment, [name]: value });
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.TextArea
          placeholder="Description"
          value={appointment.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          type="date"
          placeholder="Date"
          value={appointment.dateOfIssue}
          name="dateOfIssue"
          onChange={handleInputChange}
        />
        <Button loading={submitting} floated="right" positive type="submit" content="Zatwierdź" />
        <Button
          onClick={closeForm}
          floated="right"
          type="button"
          content="Anuluj"
        />
      </Form>
    </Segment>
  );
}
