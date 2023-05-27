import React from "react";
import { Button, Item, Segment } from "semantic-ui-react";

interface Props {
  appointments: Appointment[];
  selectAppointment: (id: string) => void;
  deleteAppointment: (id: string) => void;
}

export default function AppointmentList({
  appointments,
  selectAppointment,
  deleteAppointment,
}: Props) {
  return (
    <Segment>
      <Item.Group divided>
        {appointments.map((appointment) => (
          <Item key={appointment.id}>
            <Item.Content>
              <Item.Header as="a">Wizyta</Item.Header>
              <Item.Meta>{appointment.dateOfIssue}</Item.Meta>
              <Item.Description>
                <div>Lekarz nrX</div>
                <div>Sala nrX</div>
                <div>{appointment.description}</div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectAppointment(appointment.id)}
                  floated="right"
                  content="Zobacz szczegóły"
                  color="blue"
                />
                <Button
                  onClick={() => deleteAppointment(appointment.id)}
                  floated="right"
                  content="Odwołaj"
                  color="red"
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
