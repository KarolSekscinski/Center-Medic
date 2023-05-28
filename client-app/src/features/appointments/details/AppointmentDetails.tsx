import React from "react";
import { Button, Card} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";



export default function AppointmentDetails() {

  const {appointmentStore} = useStore();
  const {selectedAppointment: appointment, openForm, cancelSelectedAppointment} = appointmentStore;

  if (!appointment) return <LoadingComponent />;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>Wizyta</Card.Header>
        <Card.Meta>
          <span>{appointment.dateOfIssue}</span>
        </Card.Meta>
        <Card.Description>{appointment.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button onClick={() => openForm(appointment.id)} basic color="blue" content="Edytuj" />
          <Button onClick={cancelSelectedAppointment} basic color="grey" content="Anuluj" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
