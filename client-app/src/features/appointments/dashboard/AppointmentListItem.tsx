import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import AppointmentListItemAttendee from "./AppointmentListItemAttendee";
import { Appointment } from "../../../app/models/appointment";
import { useStore } from "../../../app/stores/store";
import { is } from "date-fns/locale";

interface Props {
  appointment: Appointment;
}

export default function AppointmentListItem({ appointment }: Props) {
  const user = useStore().userStore.user;
  const [isDoctor, setIsDoctor] = useState(false);
  appointment.isDoctor = isDoctor;
  useEffect(() => {
    if (appointment.doctorUserProfile?.displayName === user?.displayName) {
      
      setIsDoctor(true);
    } 
  }, [appointment.doctorUserProfile?.displayName, user?.displayName]);
  return (
    <Segment.Group>
      <Segment>
        {appointment.isCancelled && (
          <Label
            attached="top"
            color="red"
            content="Wizyta została odwołana"
            style={{ textAlign: "center" }}
          />
        )}
        <Item.Group>
          <Item>
            <Item.Image
              style={{ marginBottom: 5 }}
              size="tiny"
              circular
              src="/assets/lekarz-ikona.png"
            />
            <Item.Content>
              <Item.Header as={Link} to={`/appointments/${appointment.id}`}>
                {`Wizyta ${format(appointment.dateOfIssue!, "dd MMM yyyy")}`}
              </Item.Header>
              <Item.Description>{`Lekarz: ${appointment.doctorUserProfile?.displayName}`}</Item.Description>
              {isDoctor && (
                <Item.Description>
                  <Label basic color="orange">
                    Ty jesteś lekarzem
                  </Label>
                </Item.Description>
              )}
              {!isDoctor && !appointment.isDoctor && (
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
          {format(appointment.dateOfIssue!, "dd MMM yyyy h:mm aa")}{" "}
          <Icon name="marker" /> Nr sali 3
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
          content="Zobacz szczegóły wizyty"
        />
      </Segment>
    </Segment.Group>
  );
}
