import React from "react";
import { Button, Card} from "semantic-ui-react";

interface Props {
  appointment: Appointment;
  cancelSelectAppointment: () => void;
  openForm: (id: string) => void;
}

export default function AppointmentDetails({ appointment, cancelSelectAppointment, openForm }: Props) {
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
          <Button onClick={cancelSelectAppointment} basic color="grey" content="Anuluj" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
