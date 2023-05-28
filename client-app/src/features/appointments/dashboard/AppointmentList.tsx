import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

export default observer(function AppointmentList() {
  const { appointmentStore } = useStore();
  const { loading, deleteAppointment, appointmentsByDate } = appointmentStore;
  const [target, setTarget] = useState("");

  function handleAppointmentDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteAppointment(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {appointmentsByDate.map((appointment) => (
          <Item key={appointment.id}>
            <Item.Content>
              <Item.Header as="a">Wizyta</Item.Header>
              <Item.Meta>{appointment.dateOfIssue}</Item.Meta>
              <Item.Description>
                <div>{`Lekarz: ${appointment.doctorId}`}</div>
                <div>{`Pacjent: ${appointment.patiendId}`}</div>
                <div>Sala nrX</div>
                <div>{appointment.description}</div>
              </Item.Description>
              <Item.Extra>
                <Button
                  as={Link}
                  to={`/appointments/${appointment.id}`}
                  floated="right"
                  content="Zobacz szczegóły"
                  color="blue"
                />
                <Button
                  name={appointment.id}
                  loading={loading && target === appointment.id}
                  onClick={(e) => handleAppointmentDelete(e, appointment.id)}
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
});
