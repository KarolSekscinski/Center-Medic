import React, { useEffect } from "react";
import { Button, Card} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";



export default observer(function AppointmentDetails() {

  const {appointmentStore} = useStore();
  const {selectedAppointment: appointment, loadAppointment, loadingInitial} = appointmentStore;
  const {id} = useParams();

  useEffect(() => {
    if (id) loadAppointment(id); 
  },[id, loadAppointment])

  if (loadingInitial || !appointment) return <LoadingComponent />;

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
          <Button as={Link} to={`/manage/${appointment.id}`} basic color="blue" content="Edytuj" />
          <Button as={Link} to='/appointments' basic color="grey" content="Anuluj" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}) 
