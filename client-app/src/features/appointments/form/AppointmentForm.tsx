import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";



export default observer(function AppointmentForm() {
  const {appointmentStore} = useStore();
  const {closeForm, selectedAppointment, createAppointment, updateAppointment, loading} = appointmentStore;
  const initialState = selectedAppointment ?? {
    id: "",
    description: "",
    patiendId: 0,
    doctorId: 0,
    dateOfIssue: "",
  };

  const [appointment, setAppointment] = useState(initialState);

  function handleSubmit() {
    appointment.id ? updateAppointment(appointment) : createAppointment(appointment)
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
        <Button loading={loading} floated="right" positive type="submit" content="Zatwierdź" />
        <Button
          onClick={closeForm}
          floated="right"
          type="button"
          content="Anuluj"
        />
      </Form>
    </Segment>
  );
}) 
