import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Item, Segment, Image, Label } from "semantic-ui-react";
import { Appointment } from "../../../app/models/appointment";
import { useStore } from "../../../app/stores/store";

const appointmentImageStyle = {
  filter: "brightness(30%)",
};

const appointmentImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  appointment: Appointment;
}

export default observer(function ActivityDetailedHeader({
  appointment,
}: Props) {
  const {
    appointmentStore: { updateAttendance, loading, cancelAppointmentToggle },
  } = useStore();
   

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        {appointment.isCancelled && (
          <Label
            style={{ position: "absolute", zIndex: 1000, left: -14, top: 20 }}
            ribbon
            color="red"
            content="Wizyta odwołana"
          />
        )}
        
        <Image
          src={`/assets/categoryImages/gabinet.jpg`}
          fluid
          style={appointmentImageStyle}
        />
        <Segment style={appointmentImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={`Wizyta`}
                  style={{ color: "white" }}
                />
                <p>{format(appointment.dateOfIssue!, "dd MMM yyyy")}</p>
                <p>
                  Lekarz: {"Dr. "}
                  <strong>
                    <Link to={`/profiles/${appointment.doctor?.username}`}>
                      {appointment.doctor?.displayName}
                    </Link>
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {!appointment.isDoctor ? (
          <>
            <Button
              color={appointment.isCancelled ? "green" : "red"}
              floated="left"
              basic
              content={
                appointment.isCancelled ? "Wznow wizyte" : "Odwolaj wizyte"
              }
              onClick={cancelAppointmentToggle}
              loading={loading}
            />
            <Button
              disabled={appointment.isCancelled}
              as={Link}
              to={`/manage/${appointment.id}`}
              color="orange"
              floated="right"
            >
              Zarządzaj wizytą
            </Button>
          </>
        ) : appointment.isGoing ? (
          <Button loading={loading} onClick={updateAttendance}>
            Odwołaj wizytę
          </Button>
        ) : (
          <Button loading={loading} onClick={updateAttendance} color="teal">
            Dodaj wybieranie z listy pacjentow
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
});
