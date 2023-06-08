import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";

interface Props {
  appointment: Appointment;
}

export default function AppointmentListItem({ appointment }: Props) {
  

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/appointments/${appointment.id}`}>
                {`Wizyta ${format(appointment.dateOfIssue!, 'dd MMM yyyy h:mm aa')}`}
              </Item.Header>
              <Item.Description>{`Lekarz: ${appointment.doctorId}`}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {format(appointment.dateOfIssue!, 'dd MMM yyyy h:mm aa')}
          <Icon name="marker" /> Numer Sali
        </span>
      </Segment>
      
      <Segment clearing>
        <span>{appointment.description}</span>
        <Button
          as={Link}
          to={`/appointments/${appointment.id}`}
          floated="right"
          color="teal"
          content="Zobacz szczegóły"
        />
      </Segment>
    </Segment.Group>
  );
}
