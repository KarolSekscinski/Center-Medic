import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import AppointmentListItemAttendee from "./AppointmentListItemAttendee";
import { Appointment } from "../../../app/models/appointment";

interface Props {
  appointment: Appointment;
}

export default function AppointmentListItem({ appointment }: Props) {
  return (
    <Segment.Group>
      <Segment>
        {appointment.isCancelled && (
          <Label
            attached="top"
            color="red"
            content="Wizyta została odwołana"
            style={{ textAlign: "center" }}
            ></Label>
        )}
        <Item.Group>
          <Item>
            <Item.Image style={{marginBottom: 3}} size="tiny" circular src="/assets/lekarz-ikona.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/appointments/${appointment.id}`}>
                {`Wizyta ${format(
                  appointment.dateOfIssue!,
                  "dd MMM yyyy h:mm aa"
                )}`}
              </Item.Header>
              <Item.Description>{`Lekarz: ${appointment.doctor?.displayName}`}</Item.Description>
              {appointment.isDoctor && (
                <Item.Description>
                  <Label basic color="orange">
                    Ty jesteś lekarzem
                  </Label>
                </Item.Description>
              )}
              {appointment.isGoing && !appointment.isDoctor && (
                <Item.Description>
                  <Label basic color="green">
                    Ty jesteś pacjentem
                  </Label>
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />{" "}
          {format(appointment.dateOfIssue!, "dd MMM yyyy h:mm aa")}
          <Icon name="marker" /> Numer Sali
        </span>
      </Segment>
      <Segment secondary>
        <AppointmentListItemAttendee attendees={appointment.attendees!} />
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
