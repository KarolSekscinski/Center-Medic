import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {v4 as uuid} from 'uuid';

export default observer(function AppointmentForm() {
  const { appointmentStore } = useStore();
  const {
    createAppointment,
    updateAppointment,
    loading,
    loadAppointment,
    loadingInitial,
  } = appointmentStore;

  const { id } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState<Appointment>({
    id: "",
    description: "",
    patiendId: 0,
    doctorId: 0,
    dateOfIssue: "",
  });
  useEffect(() => {
    if (id)
      loadAppointment(id).then((appointment) => setAppointment(appointment!));
  }, [id, loadAppointment]);

  function handleSubmit() {
    if (!appointment.id) {
      appointment.id = uuid();
      createAppointment(appointment).then(() => navigate(`/appointments/${appointment.id}`));
    } else {
      updateAppointment(appointment).then(() => navigate(`/appointments/${appointment.id}`));
    }
    
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setAppointment({ ...appointment, [name]: value });
  }

  if (loadingInitial)
    return <LoadingComponent content="Loading appointment..." />;

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
        <Button
          
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Zatwierdź"
        />
        <Button as={Link} to="/appointments" floated="right" type="button" content="Anuluj" />
      </Form>
    </Segment>
  );
});
